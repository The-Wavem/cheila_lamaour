import { useEffect } from 'react';

/**
 * @description Hook para avisar o usuário se ele tentar sair da página com alterações não salvas.
 * @param {boolean} isDirty - Se verdadeiro, ativa a proteção.
 */
export function useDirtyProtection(isDirty) {
    useEffect(() => {
        // Função que o navegador chama antes de fechar/atualizar
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = ''; // Padrão antigo para Chrome/Legacy
                return ''; // Necessário para alguns navegadores
            }
        };

        if (isDirty) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        // Limpeza (Cleanup) quando o componente desmonta ou isDirty muda
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);
}