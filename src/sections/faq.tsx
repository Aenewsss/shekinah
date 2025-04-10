'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const questions = [
    "Quais são os requisitos para alugar um carro executivo?",
    "Os motoristas são treinados e qualificados?",
    "Quais formas de pagamento são aceitas?",
    "Posso agendar um serviço com antecedência?",
    "O serviço de aluguel inclui seguro e assistência 24h?",
    "Como funciona o cancelamento ou alteração da reserva?"
  ];

  const answers = [
    "É necessário possuir CNH válida, cartão de crédito e ter mais de 21 anos.",
    "Sim, todos os motoristas passam por treinamentos e são certificados.",
    "Aceitamos cartão de crédito, débito, PIX e boleto (para empresas).",
    "Sim, você pode agendar com até 30 dias de antecedência.",
    "Sim, todos os serviços incluem seguro e assistência 24 horas.",
    "O cancelamento pode ser feito até 24h antes. Alterações dependem de disponibilidade."
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-12 text-center text-[#0168ec]">
        PERGUNTAS FREQUENTES
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {questions.map((question, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="bg-[#151515] rounded-lg overflow-hidden">
              <button
                className="cursor-pointer flex justify-between items-center w-full p-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-medium text-[#0168ec] text-xl">{question}</span>
                <span className="text-[#0168ec]">{isOpen ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-white"
                  >
                    {answers[index]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}