/**
 * Dados institucionais centralizados.
 * Valores entre colchetes são PLACEHOLDERS — o documento proíbe inventar
 * PIX, endereço, WhatsApp e CNPJ. Substituir pelos dados oficiais.
 */
export const ORG = {
  name: "ONG Cristo é o Salvador",
  short: "CES-MT",
  cnpj: "30.948.606/0001-14",
  address: "Rua Rio Grande, nº 56, Bairro Novo Horizonte, Cuiabá - MT, CEP 78058-667",
  phone: "(65) 99284-0737",
  whatsapp: "(65) 99284-0737",
  whatsappLink: "https://wa.me/5565992840737?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20a%C3%A7%C3%B5es%20da%20ONG%20CES-MT.",
  email: "ongcesmt@gmail.com",
  hours: "Segunda a sexta, das 08h às 17h",
  social: {
    instagram: "https://www.instagram.com/ongcesmt7/",
    facebook: "https://www.facebook.com/p/ONG-Cristo-Salvador-100069717335311/?locale=pt_BR",
  },
  pix: [
    { label: "PIX 1 — Chave Celular", key: "65992335537" },
    { label: "PIX 2 — Chave Celular", key: "65992840737" },
  ],
} as const;

export const NAV = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/projetos", label: "Projetos" },
  { to: "/atividades", label: "Atividades" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;

export type ProjectStatus = "execucao" | "concluido" | "planejado";
export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  objective: string;
  audience: string;
  impact: string;
}

export const PROJECTS: Project[] = [
  { slug: "acolher", title: "Projeto Acolher", status: "execucao", objective: "Oferecer escuta, orientação e encaminhamento a famílias em situação de vulnerabilidade.", audience: "Famílias da comunidade", impact: "Acompanhamento contínuo e fortalecimento de vínculos" },
  { slug: "cesta-solidaria", title: "Cesta Solidária", status: "execucao", objective: "Arrecadar e distribuir alimentos a famílias cadastradas.", audience: "Famílias em insegurança alimentar", impact: "Segurança alimentar mensal" },
  { slug: "reforco-escolar", title: "Reforço Escolar", status: "execucao", objective: "Apoiar crianças e adolescentes no desempenho escolar.", audience: "Crianças de 6 a 14 anos", impact: "Permanência e melhora no aprendizado" },
  { slug: "natal-solidario", title: "Natal Solidário", status: "concluido", objective: "Campanha de arrecadação de brinquedos e cestas natalinas.", audience: "Crianças e famílias atendidas", impact: "Celebração digna para as famílias" },
  { slug: "agasalho", title: "Campanha do Agasalho", status: "concluido", objective: "Coleta e distribuição de roupas e cobertores.", audience: "Pessoas em situação de rua e famílias", impact: "Proteção nos períodos de frio" },
  { slug: "capacitar", title: "Capacitar para o Trabalho", status: "planejado", objective: "Cursos profissionalizantes para jovens e adultos.", audience: "Jovens a partir de 16 anos e adultos", impact: "Geração de renda e autonomia" },
  { slug: "espaco-sede", title: "Nova Sede Comunitária", status: "planejado", objective: "Estruturar espaço próprio para oficinas e atendimentos.", audience: "Toda a comunidade atendida", impact: "Ampliação da capacidade de atendimento" },
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  execucao: "Em execução",
  concluido: "Concluído",
  planejado: "Planejado",
};
