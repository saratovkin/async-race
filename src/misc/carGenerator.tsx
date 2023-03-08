interface ISpecs {
  name: string;
  color: string;
}

class CarGenerator {
  static models = [
    'Roadster',
    'S',
    'X',
    '3',
    'Y',
    'Cybertruck',
    'X5',
    'X7',
    'X3',
    'X6',
    'GT4',
    'FXX',
    '599 GTO',
    'Enzo',
    '458 Italia',
    '250 GTO',
    'Priora',
    '4x4',
    'Rio',
    'Focus',
    'Kalina',
    'Vesta',
    'Spark',
    'Lacetti',
    'Nexia',
    'Matiz',
    'Cobalt',
    'Captiva',
    'A7',
    'A5',
    'A3',
    'A8',
    'TT',
    'Corolla',
    'Camry',
    'RAV4',
    'Impreza',
    'WRX',
    'ES',
    'LS',
    'RX',
    'GX',
    'LX',
    'GS',
    'LC500',
    'Gallardo',
    'Aventador',
    '911',
    'Cayenne',
    'FX37',
  ];

  static brands = [
    'Audi',
    'Alfa Romeo',
    'Alpina',
    'Aston Martin',
    'Axon',
    'Ford',
    'Ferrari',
    'Fiat',
    'GAZ',
    'GMC',
    'Honda',
    'Hummer',
    'Hyundai',
    'Infiniti',
    'Isuzu',
    'JAC',
    'Jaguar',
    'Jeep',
    'Kamaz',
    'Lada',
    'Lexus',
    'Lotus',
    'MAN',
    'Maybach',
    'MAZ',
    'Mazda',
    'McLaren',
    'Nissan',
    'Opel',
    'Paccar',
    'Pagani',
    'Pontiac',
    'Porsche',
    'Renault',
    'Smart',
    'Subaru',
    'Suzuki',
    'Tesla',
    'Toyota',
    'UAZ',
    'Volvo',
    'ZAZ',
    'XPeng',
    'TVR',
    'Saab',
    'RAM',
    'Chevrolet',
    'Mazzanti',
    'Daewoo',
  ];

  static getRandomHexColor() {
    return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
  }

  static generateCars() {
    const arr: ISpecs[] = [];
    for (let i = 0; i < 100; i += 1) {
      const brand = CarGenerator.brands[Math.floor(Math.random() * CarGenerator.brands.length)];
      const model = CarGenerator.models[Math.floor(Math.random() * CarGenerator.models.length)];
      const color = CarGenerator.getRandomHexColor();
      arr.push({
        name: `${brand} ${model}`,
        color,
      });
    }
    return arr;
  }
}

export default CarGenerator;
