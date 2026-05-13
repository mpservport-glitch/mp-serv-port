import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Sua chave que você gerou
const resend = new Resend('re_deD5Vuy8_9zW6Ah32nahFzNwMx2g4Kqyu');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, whatsapp, servico, mensagem } = body;

    const { data, error } = await resend.emails.send({
      from: 'MP SERV PORT <onboarding@resend.dev>',
      to: ['mpservport@gmail.com'], // Seu e-mail de destino
      subject: `Novo Orçamento: ${servico}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Novo pedido de orçamento recebido!</h2>
          <p><strong>Nome/Empresa:</strong> ${nome}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Serviço:</strong> ${servico}</p>
          <p><strong>Mensagem:</strong> ${mensagem}</p>
          <hr />
          <p style="font-size: 12px; color: #888;">Enviado via sistema MP SERV PORT</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
