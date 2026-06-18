import { NextResponse } from 'next/server';
import { sendSms } from '@/lib/eskiz';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 1. Get all students with negative balance (debtors)
    const { data: debtors, error: fetchError } = await supabase
      .from('students')
      .select('id, full_name, parent_phone, balance')
      .lt('balance', 0); // Balance less than 0 means they owe money

    if (fetchError) throw fetchError;

    if (!debtors || debtors.length === 0) {
      return NextResponse.json({ success: true, message: 'No debtors found' });
    }

    const results = [];

    // 2. Loop through and send SMS
    for (const student of debtors) {
      const debtAmount = Math.abs(student.balance).toLocaleString('uz-UZ');
      const message = `Hurmatli ota-ona! Farzandingiz ${student.full_name} uchun HACKATHON IT SCHOOL da ${debtAmount} so'm to'lov qarzdorligi mavjud. Iltimos, to'lovni amalga oshiring.`;

      const smsRes = await sendSms(student.parent_phone, message);
      
      // 3. Log into database
      await supabase.from('sms_logs').insert([{
        phone_number: student.parent_phone,
        message: message,
        status: smsRes.success ? 'sent' : 'failed',
        eskiz_response: smsRes.success ? smsRes.data : smsRes.error,
        sent_by: null // Automated
      }]);

      results.push({ studentId: student.id, success: smsRes.success });
    }

    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
