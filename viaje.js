class Viaje {

    constructor(id,km,tiempo,valor_boleto){
        this.id=id;
        this.km=km;
        this.tiempo=tiempo;
        this.valor_boleto=valor_boleto;
        

    }

    static crearViaje(viaje){


        let V = new Viaje(viaje.id,viaje.km,viaje.valor_boleto);
        
        return V ;

    }
}