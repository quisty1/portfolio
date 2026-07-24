/**
 * Scroll-reveal: IntersectionObserver + CSS-классы из main.css
 * При prefers-reduced-motion элемент сразу считается видимым
 */

export type RevealVariant = 'fade' | 'slide' | 'slide-left'

export interface UseScrollRevealOptions {
  /** Какой CSS-класс применить: reveal / reveal-fade / reveal-slide-left */
  variant?: RevealVariant
  /** Задержка анимации в ms → CSS-var --reveal-delay */
  delay?: number
  /** Доля видимости цели для срабатывания observer */
  threshold?: number
  /** Смещение root: отрицательный bottom включает анимацию чуть раньше */
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

    // Одноразовый observer: после первого появления отписываемся
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
