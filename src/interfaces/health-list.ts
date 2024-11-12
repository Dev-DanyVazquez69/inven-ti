export interface ItemListProps {
    health: {
        id: string,
        type: "vaccines" | "exams" | "consultations" | "medicines",
        data: {
            id: string,
            title: string,
            status: "pendente" | "concluido"
            date: Date,
        }[]
    }[]
}