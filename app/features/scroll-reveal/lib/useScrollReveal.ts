export type RevealVariant = 'fade' | 'slide' | 'slide-left'

export interface UseScrollRevealOptions {
  variant?: RevealVariant
  delay?: number
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    variant = 'slide',
    delay = 0,
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
  } = options

  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  const variantClass = computed(() => {
    if (variant === 'fade') {
      return 'reveal-fade'
    }

    if (variant === 'slide-left') {
      return 'reveal-slide-left'
    }

    return 'reveal'
  })

  onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      isVisible.value = true
      return
    }

    const { stop } = useIntersectionObserver(
      target,
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          stop()
        }
      },
      { threshold, rootMargin },
    )
  })

  const style = computed(() => ({
    '--reveal-delay': `${delay}ms`,
  }))

  return {
    target,
    isVisible,
    variantClass,
    style,
  }
}
