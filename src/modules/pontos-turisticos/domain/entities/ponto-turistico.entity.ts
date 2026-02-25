export interface PontoTuristicoProps {
  id?: number;
  nome: string;
  tipo: string;
  horario: string;
  img: string;
  desc: string;
  cidadeId: number;
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

    get cidadeId() {
        return this.props.cidadeId
    }

    toJSON() {
        return {
            id: this.props.id,
            nome: this.props.nome,
            tipo: this.props.tipo,
            
        }
    }
}
