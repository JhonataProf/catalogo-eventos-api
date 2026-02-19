export interface PontoTuristicoProps {
  id?: string;
  nome: string;
  tipo: string;
  horario: string;
  img: string;
  desc: string;
}

export class PontoTuristicoEntity {
    private props: PontoTuristicoProps
    constructor(props: PontoTuristicoProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get nome() {
        return this.props.nome
    }

    get tipo() {
        return this.props.tipo
    }

    get horario() {
        return this.props.horario
    }

    get img() {
        return this.props.img
    }

    get desc() {
        return this.props.desc
    }

    toJSON() {
        return {
            id: this.props.id,
            nome: this.props.nome,
            tipo: this.props.tipo,
            
        }
    }
}
