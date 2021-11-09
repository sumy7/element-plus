import { computed, getCurrentInstance, watch, onMounted } from 'vue'
import { isFunction } from '@vue/shared'
import { isBool } from '@element-plus/utils/util'
import { UPDATE_MODEL_EVENT } from '@element-plus/utils/constants'
import isServer from '@element-plus/utils/isServer'

import type { Ref, ComponentPublicInstance } from 'vue'

export const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null,
  },

  'onUpdate:modelValue': Function,
}

export const useModelToggleEmits = [UPDATE_MODEL_EVENT]

export type ModelToggleParams = {
  indicator: Ref<boolean>
  shouldHideWhenRouteChanges?: Ref<boolean>
  shouldProceed?: () => boolean
  onShow?: () => void
  onHide?: () => void
  modelKey?: string
}

export const useModelToggle = ({
  indicator,
  shouldHideWhenRouteChanges,
  shouldProceed,
  onShow,
  onHide,
  modelKey = 'modelValue',
}: ModelToggleParams) => {
  const { appContext, props, proxy, emit } = getCurrentInstance()!

  const updateEventKey = `update:${modelKey}`

  const hasUpdateHandler = computed(() =>
    isFunction(props[`onUpdate:${modelKey}`])
  )
  // when it matches the default value we say this is absent
  // though this could be mistakenly passed from the user but we need to rule out that
  // condition
  const isModelBindingAbsent = computed(() => props[modelKey] === null)

  const doShow = () => {
    if (indicator.value === true) {
      return
    }

    indicator.value = true
    if (isFunction(onShow)) {
      onShow()
    }
  }

  const doHide = () => {
    if (indicator.value === false) {
      return
    }

    indicator.value = false

    if (isFunction(onHide)) {
      onHide()
    }
  }

  const show = () => {
    if (
      props.disabled === true ||
      (isFunction(shouldProceed) && !shouldProceed())
    )
      return

    const shouldEmit = hasUpdateHandler.value && !isServer

    if (shouldEmit) {
      emit(updateEventKey, true)
    }

    if (isModelBindingAbsent.value || !shouldEmit) {
      doShow()
    }
  }

  const hide = () => {
    if (props.disabled === true || isServer) return

    const shouldEmit = hasUpdateHandler.value && !isServer

    if (shouldEmit) {
      emit(updateEventKey, false)
    }

    if (isModelBindingAbsent.value || !shouldEmit) {
      doHide()
    }
  }

  const onChange = (val: boolean) => {
    if (!isBool(val)) return
    if (props.disabled && val) {
      if (hasUpdateHandler.value) {
        emit(updateEventKey, false)
      }
    } else if (indicator.value !== val) {
      if (val) {
        doShow()
      } else {
        doHide()
      }
    }
  }

  const toggle = () => {
    if (indicator.value) {
      hide()
    } else {
      show()
    }
  }

  watch(() => props[modelKey], onChange as any)

  if (
    shouldHideWhenRouteChanges &&
    appContext.config.globalProperties.$route !== undefined
  ) {
    watch(
      () => ({
        ...(
          proxy as ComponentPublicInstance<{
            $route: any
          }>
        ).$route,
      }),
      () => {
        if (shouldHideWhenRouteChanges.value && indicator.value) {
          hide()
        }
      }
    )
  }

  onMounted(() => {
    onChange(props[modelKey] as boolean)
  })

  return {
    hide,
    show,
    toggle,
  }
}
