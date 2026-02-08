export function fakeApi<T>(data: T, delay = 1500): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // simula erro 10% das vezes
      if (Math.random() < 0.1) {
        reject(new Error('Erro no servidor'))
      } else {
        resolve(data)
      }
    }, delay)
  })
}
