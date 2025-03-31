import { MuiModalChildren } from '../components';
interface ProviderProps {
    children: React.ReactNode;
}
interface ContextModal {
    component: MuiModalChildren | null;
    variant?: 'modal' | 'popup';
    preventDismiss?: boolean;
    onClose?: () => void;
}
export type ModalType = 'none' | 'loadingModal' | 'statusModal' | 'externalLink';
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export interface ModalState<T> {
    type: ModalType;
    state: T | null;
}
interface ModalContextType<T> {
    modal: ModalState<T>;
    modals: Record<ModalType, ContextModal>;
    state: T | null;
    openModal: (modal: Optional<ModalState<T>, 'state'>) => void;
    closeModal: () => void;
}
declare function ModalProvider<T>({ children, ...props }: ProviderProps): import("react/jsx-runtime").JSX.Element;
declare function useModal<T>(): ModalContextType<T>;
export { ModalProvider, useModal };
