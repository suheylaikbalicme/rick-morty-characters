export function handleApiError(err) {
  if (!err.response) {
    return "Sunucuya bağlanılamadı.";
  }
  if (err.response.status === 404) {
    return "Veri bulunamadı.";
  }
  return "Beklenmedik bir hata oluştu.";
}
