import api from './api';

export async function fetchFiles(roomId) {
  const { data } = await api.get('/files', { params: { roomId } });
  return data.files || [];
}

export async function createFile(payload) {
  const { data } = await api.post('/files', payload);
  return data.file;
}

export async function updateFile(id, payload) {
  const { data } = await api.put(`/files/${id}`, payload);
  return data.file;
}

export async function deleteFile(id) {
  await api.delete(`/files/${id}`);
}
