import { create } from 'zustand'

type LayoutStore = {
  isMobileSidebarOpen: boolean
  toggleMobileSidebar: () => void
}

export const useLayoutStore = create<LayoutStore>(set => ({
  isMobileSidebarOpen: false,
  toggleMobileSidebar: () =>
    set(state => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
}))
