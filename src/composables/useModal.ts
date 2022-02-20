import { ref } from 'vue';

export const useModal = () => {

    const isOpen = ref(false)

    return{
        isOpen,
        closeModal: () => isOpen.value = false,
        openModal: () => isOpen.value = true
    }

}
