export function showToast(message: any, toast: any, duration = 5000): void {
  toast.show({ description: message, duration: duration, size: '2/6' })
}