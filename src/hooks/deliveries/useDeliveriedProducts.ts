import { useEffect, useState } from "react"

export function useDeliveredProducts(saleId: string) {
  const storageKey = `delivered-products-${saleId}`

  const [deliveredSet, setDeliveredSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    const localData = localStorage.getItem(storageKey)
    if (localData) {
      try {
        const parsed = JSON.parse(localData)
        if (Array.isArray(parsed)) {
          setDeliveredSet(new Set(parsed))
        }
      } catch {
        console.warn("Erro ao ler localStorage")
      }
    }
  }, [saleId])

  const saveToLocalStorage = (set: Set<string>) => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(set)))
  }

  const clearLocalStorage = () => {
    localStorage.removeItem(storageKey)
  }

  const toggleProductDelivered = (productId: string) => {
    setDeliveredSet(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      saveToLocalStorage(newSet)
      return newSet
    })
  }

  const markAllAsDelivered = (productIds: string[]) => {
    const newSet = new Set(productIds)
    setDeliveredSet(newSet)
    clearLocalStorage()
  }

  return {
    deliveredSet,
    toggleProductDelivered,
    markAllAsDelivered,
  }
}
