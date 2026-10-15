export function crc16(str: string): string {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generatePixPayload({
  key,
  name = "CESMT ONG",
  city = "VARZEA GRANDE",
  txid = "***",
}: {
  key: string;
  name?: string;
  city?: string;
  txid?: string;
}): string {
  const formatField = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, "0");
    return `${id}${len}${value}`;
  };

  const cleanKey = key.trim().replace(/[^\d+a-zA-Z@-]/g, "");
  let pixKey = cleanKey;
  if (/^\d{11}$/.test(cleanKey)) {
    pixKey = `+55${cleanKey}`;
  }

  const merchantAccountInfo =
    formatField("00", "br.gov.bcb.pix") +
    formatField("01", pixKey);

  const additionalDataField = formatField("05", txid);

  const cleanName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .slice(0, 25);

  const cleanCity = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .slice(0, 15);

  let payload =
    formatField("00", "01") +
    formatField("26", merchantAccountInfo) +
    formatField("52", "0000") +
    formatField("53", "986") +
    formatField("58", "BR") +
    formatField("59", cleanName) +
    formatField("60", cleanCity) +
    formatField("62", additionalDataField) +
    "6304";

  payload += crc16(payload);
  return payload;
}
