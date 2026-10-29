export const CUIABA_TIMEZONE = "America/Cuiaba";

export type EventDynamicStatus = "em_andamento" | "futuro" | "encerrado";

export interface RawCalendarEvent {
  id: string;
  title: string;
  category: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  timeDisplay: string;
  location: string;
  description: string;
}

export interface EvaluatedCalendarEvent extends RawCalendarEvent {
  startTimestamp: number;
  endTimestamp: number;
  dateFormatted: string;
  dayOfWeek: string;
  status: EventDynamicStatus;
  statusLabel: string;
  relativeTimeLabel: string;
  daysFromToday: number;
  isNextHighlight: boolean;
}

export const CALENDAR_EVENTS_DATA: RawCalendarEvent[] = [
  {
    id: "evt-2026-02-14-volta-aulas",
    title: "Mutirão Solidário de Volta às Aulas e Entrega de Kits Escolares",
    category: "Ação comunitária",
    startDate: "2026-02-14",
    endDate: "2026-02-14",
    startTime: "08:30",
    endTime: "12:00",
    timeDisplay: "08h30 às 12h00",
    location: "Sede CES-MT — Rua Rio Grande, nº 56, Novo Horizonte",
    description:
      "Entrega de materiais escolares arrecadados e acolhimento das famílias atendidas pelo Reforço Escolar.",
  },
  {
    id: "evt-2026-03-07-mutirao-cadastro-marco",
    title: "Mutirão de cadastro de famílias (Março)",
    category: "Ação comunitária",
    startDate: "2026-03-07",
    endDate: "2026-03-07",
    startTime: "08:00",
    endTime: "12:00",
    timeDisplay: "08h00 às 12h00",
    location: "Sede CES-MT — Rua Rio Grande, nº 56, Novo Horizonte",
    description:
      "Atendimento social, atualização cadastral e triagem de famílias para a Cesta Solidária e o Mercadinho Solidário.",
  },
  {
    id: "evt-2026-04-04-mutirao-cadastro-abril",
    title: "Mutirão de cadastro de famílias (Abril)",
    category: "Ação comunitária",
    startDate: "2026-04-04",
    endDate: "2026-04-04",
    startTime: "08:00",
    endTime: "12:00",
    timeDisplay: "08h00 às 12h00",
    location: "Sede CES-MT — Rua Rio Grande, nº 56, Novo Horizonte",
    description:
      "Plantão mensal de escuta, acolhimento e atualização de cadastro das famílias acompanhadas pela ONG.",
  },
  {
    id: "evt-2026-05-02-mutirao-cadastro-maio",
    title: "Mutirão de cadastro de famílias",
    category: "Ação comunitária",
    startDate: "2026-05-02",
    endDate: "2026-05-02",
    startTime: "08:00",
    endTime: "12:00",
    timeDisplay: "1º Sábado • 08h00 às 12h00",
    location: "Sede CES-MT — Rua Rio Grande, nº 56, Novo Horizonte",
    description:
      "Cadastramento e atualização socioeconômica das famílias para participação nas entregas de cestas e projetos sociais.",
  },
  {
    id: "evt-2026-06-06-campanha-agasalho",
    title: "Campanha do Agasalho e Acolhimento Solidário",
    category: "Arrecadação e Doação",
    startDate: "2026-06-06",
    endDate: "2026-06-27",
    startTime: "08:00",
    endTime: "17:00",
    timeDisplay: "Seg a Sex • 08h00 às 17h00",
    location: "Sede CES-MT — Rua Rio Grande, nº 56, Novo Horizonte",
    description:
      "Coleta e distribuição de roupas, calçados e cobertores para proteção de famílias e pessoas em vulnerabilidade nos períodos de frio.",
  },
  {
    id: "evt-2026-10-10-dia-das-criancas",
    title: "Ação Social e Dia das Crianças",
    category: "Evento comunitário",
    startDate: "2026-10-10",
    endDate: "2026-10-10",
    startTime: "08:30",
    endTime: "13:00",
    timeDisplay: "08h30 às 13h00",
    location: "Sede CES-MT — Bairro Novo Horizonte, Cuiabá - MT",
    description:
      "Programação especial com recreação, oficinas educativas, lanche comunitário e entrega de brinquedos para as crianças atendidas.",
  },
  {
    id: "evt-2026-11-15-campanha-natal-solidario",
    title: "Campanha Natal Solidário",
    category: "Arrecadação e Doação",
    startDate: "2026-11-15",
    endDate: "2026-12-20",
    startTime: "08:00",
    endTime: "17:00",
    timeDisplay: "Seg a Sex • 08h00 às 17h00",
    location: "Sede CES-MT — Rua Rio Grande, nº 56, Novo Horizonte",
    description:
      "Campanha anual de arrecadação e entrega de brinquedos, alimentos e cestas natalinas para proporcionar uma celebração digna às famílias.",
  },
];

export function parseCuiabaDateTime(dateStr: string, timeStr: string = "00:00"): Date {
  const cleanDate = dateStr.trim();
  const cleanTime = timeStr.trim();
  const timeWithSeconds = cleanTime.length === 5 ? `${cleanTime}:00` : cleanTime;
  return new Date(`${cleanDate}T${timeWithSeconds}-04:00`);
}

export function getCuiabaNowParts(referenceDate: Date = new Date()): {
  year: number;
  month: number;
  day: number;
  weekday: number;
  isoDate: string;
} {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: CUIABA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const isoDate = formatter.format(referenceDate);
  const [y, m, d] = isoDate.split("-").map(Number);
  const noonCuiaba = parseCuiabaDateTime(isoDate, "12:00");
  const weekday = noonCuiaba.getUTCDay();

  return {
    year: y,
    month: m,
    day: d,
    weekday,
    isoDate,
  };
}

export function formatEventDateRange(startDateStr: string, endDateStr?: string): {
  dateFormatted: string;
  dayOfWeek: string;
} {
  const startNoon = parseCuiabaDateTime(startDateStr, "12:00");
  const endNoon = endDateStr ? parseCuiabaDateTime(endDateStr, "12:00") : startNoon;

  const fullFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: CUIABA_TIMEZONE,
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const shortDayMonthFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: CUIABA_TIMEZONE,
    day: "2-digit",
    month: "short",
  });

  const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: CUIABA_TIMEZONE,
    weekday: "long",
  });

  const rawWeekday = weekdayFormatter.format(startNoon);
  const capitalizedWeekday = rawWeekday.charAt(0).toUpperCase() + rawWeekday.slice(1);

  if (!endDateStr || endDateStr === startDateStr) {
    return {
      dateFormatted: fullFormatter.format(startNoon),
      dayOfWeek: capitalizedWeekday,
    };
  }

  return {
    dateFormatted: `${shortDayMonthFormatter.format(startNoon)} a ${fullFormatter.format(endNoon)}`,
    dayOfWeek: `Período (${capitalizedWeekday})`,
  };
}

export function evaluateCalendarEvents(
  rawEvents: RawCalendarEvent[] = CALENDAR_EVENTS_DATA,
  referenceDate: Date = new Date()
): EvaluatedCalendarEvent[] {
  const nowMs = referenceDate.getTime();
  const { isoDate: todayIso } = getCuiabaNowParts(referenceDate);
  const todayStartMs = parseCuiabaDateTime(todayIso, "00:00").getTime();

  const uniqueMap = new Map<string, RawCalendarEvent>();
  for (const item of rawEvents) {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  }

  const evaluated: EvaluatedCalendarEvent[] = Array.from(uniqueMap.values()).map((evt) => {
    const startStr = evt.startDate;
    const endStr = evt.endDate && evt.endDate >= evt.startDate ? evt.endDate : evt.startDate;

    const startTimeStr = evt.startTime || "00:00";
    const endTimeStr = evt.endTime || "23:59";

    const startDateObj = parseCuiabaDateTime(startStr, startTimeStr);
    const endDateObj = parseCuiabaDateTime(endStr, endTimeStr);

    const startTimestamp = startDateObj.getTime();
    const endTimestamp = Math.max(startTimestamp, endDateObj.getTime());

    const eventStartMidnightMs = parseCuiabaDateTime(startStr, "00:00").getTime();
    const eventEndMidnightMs = parseCuiabaDateTime(endStr, "00:00").getTime();

    const daysUntilStart = Math.round(
      (eventStartMidnightMs - todayStartMs) / (1000 * 60 * 60 * 24)
    );
    const daysSinceEnd = Math.round(
      (todayStartMs - eventEndMidnightMs) / (1000 * 60 * 60 * 24)
    );

    let status: EventDynamicStatus;
    let statusLabel: string;
    let relativeTimeLabel: string;

    if (nowMs > endTimestamp) {
      status = "encerrado";
      statusLabel = "Encerrado";
      if (daysSinceEnd <= 0) {
        relativeTimeLabel = "Encerrado hoje";
      } else if (daysSinceEnd === 1) {
        relativeTimeLabel = "Realizado ontem";
      } else {
        relativeTimeLabel = `Realizado há ${daysSinceEnd} dias`;
      }
    } else if (nowMs >= startTimestamp && nowMs <= endTimestamp) {
      status = "em_andamento";
      statusLabel = "Em andamento";
      relativeTimeLabel =
        startStr === endStr ? "Acontecendo hoje" : "Ação em andamento neste período";
    } else if (todayIso >= startStr && todayIso <= endStr) {
      status = "em_andamento";
      statusLabel = "Programado para hoje";
      relativeTimeLabel = `Hoje, às ${startTimeStr}`;
    } else {
      status = "futuro";
      statusLabel = "Próximo evento";
      if (daysUntilStart === 1) {
        relativeTimeLabel = "Amanhã";
      } else if (daysUntilStart <= 7) {
        relativeTimeLabel = `Em ${daysUntilStart} dias`;
      } else {
        relativeTimeLabel = `Faltam ${daysUntilStart} dias`;
      }
    }

    const { dateFormatted, dayOfWeek } = formatEventDateRange(startStr, endStr);

    return {
      ...evt,
      endDate: endStr,
      startTimestamp,
      endTimestamp,
      dateFormatted,
      dayOfWeek,
      status,
      statusLabel,
      relativeTimeLabel,
      daysFromToday: daysUntilStart,
      isNextHighlight: false,
    };
  });

  const ongoing = evaluated
    .filter((e) => e.status === "em_andamento")
    .sort((a, b) => a.startTimestamp - b.startTimestamp);

  const upcoming = evaluated
    .filter((e) => e.status === "futuro")
    .sort((a, b) => a.startTimestamp - b.startTimestamp);

  const past = evaluated
    .filter((e) => e.status === "encerrado")
    .sort((a, b) => b.endTimestamp - a.endTimestamp);

  if (ongoing.length > 0) {
    ongoing[0].isNextHighlight = true;
  }
  if (upcoming.length > 0) {
    upcoming[0].isNextHighlight = true;
  }

  return [...ongoing, ...upcoming, ...past];
}
