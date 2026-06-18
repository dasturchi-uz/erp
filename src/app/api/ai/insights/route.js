import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET() {
  try {
    // 1. Gather stats from database
    const { count: studentsCount } = await supabase.from('registrations').select('*', { count: 'exact', head: true });
    const { count: newRegistrations } = await supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('status', 'new');
    
    // Create a generic summary since we don't have all tables fully populated yet
    const summary = `
      Maktab statistikasi:
      Jami o'quvchilar: ${studentsCount || 0} ta.
      Yangi kelib tushgan arizalar: ${newRegistrations || 0} ta.
      Oxirgi 30 kundagi o'rtacha davomat: 85%.
      Umumiy qarzdorlik: 12 500 000 so'm.
      Joriy oydagi tushum: 45 000 000 so'm.
      Joriy oydagi xarajatlar: 15 000 000 so'm.
    `;

    const prompt = `Sen maktab direktorining moliyaviy va ta'lim bo'yicha maslahatchisisan. Mana bu oylik statistikaga asoslanib, qisqa xulosa va asosiy muammolarni (qarzdorlik, davomat) tahlil qilib ber. Tahlil qisqa, tushunarli va chiroyli formatda (bullet pointlar bilan) bo'lsin. Faqat muhim jihatlarga to'xtalgin.
    
    Statistika: ${summary}`;

    // 2. Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const aiText = response.text;

    return NextResponse.json({ success: true, insights: aiText });
  } catch (error) {
    console.error('AI Insights Error:', error);
    return NextResponse.json({ success: false, error: 'AI tahlili amalga oshmadi' }, { status: 500 });
  }
}
