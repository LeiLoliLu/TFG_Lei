const townsfolk = [
  { "name": "Caelynn - Aventurera Escurridiza", "greeting": "Hola, necesito unos suministros.", "type": "adventurer" },
  { "name": "Cawbett - Cuervo Parlanchín", "greeting": "¡Buen día cawmarada Herborista! Necesito tu ayuda para cawntinuar con mis aventuras.", "type": "adventurer" },
  { "name": "Gin - Pícaro Kobold", "greeting": "Pssst. ¡Hola! Necesito una cosita.", "type": "adventurer" },
  { "name": "Longrim Wymberforged - Druida Viajero", "greeting": "Buenas tardes, rapaz. Hoy hace un día mágico, ¿No le parece?", "type": "adventurer" },
  { "name": "Maccon Iceblood - Cazador del pueblo", "greeting": "¿Tienes mucho lío? Intentaré pedir rápido.", "type": "adventurer" },
  { "name": "Witchette Aeterna - El sombrero es la bruja", "greeting": "Hola, ¿Me puedes ayudar? Necesito unas cositas.", "type": "mage" },
  { "name": "Maeve Silvermoon - Oráculo Lunar", "greeting": "Muy buen dia, Herborista. ¿Saldrás por la noche? La luna va a estar preciosa.", "type": "mage" },
  { "name": "Palmeadus Pico de Rubí - Gran Archimago", "greeting": "Saludos, joven mortal. Requiero tus servicios una vez más.", "type": "mage" },
  { "name": "Stretch y Stitches - Gemelos Ilusionistas", "greeting": "(ambos a la vez) ¡Hola, hola!", "type": "mage" },
  { "name": "Eloise Sapeye - Médica Errante", "greeting": "Hola... Estoy de paso. Tu tienda es realmente preciosa.", "type": "merchant" },
  { "name": "Glob - Mercader Gelatinoso", "greeting": "Uy...Te he llenado la entrada de babas. Lo siento.", "type": "merchant" },
  { "name": "Solor Maeafin - Vendedor de Micelio", "greeting": "¡Buenos días! Necesito un favorcillo. ¡Será rápido!", "type": "merchant" },
  { "name": "Amely Lawkin - Alcaldesa Nerviosa", "greeting": "¡Muy buenos dias! Me alegra verte por aquí. Aunque, siendo sinceros, sería raro que no lo estuvieras, jaja.", "type": "town" },
  { "name": "Daph Swiftstride - Mensajero Centauro", "greeting": "¡Tengo prisa y mucho trabajo así que vamos al grano!", "type": "town" },
  { "name": "Eldric Stonemantle - Forjador Enano", "greeting": "Buenas tardes. ¿Te pillo en buen momento?", "type": "town" },
  { "name": "Helga Barbafresca - Dueña de la taberna del pueblo", "greeting": "¡Buenos días por la mañana! Espero que hayas desayunado.", "type": "town" },
  { "name": "Isabel Hojaoliva - Abuelita Adorable", "greeting": "Hola, joven. Hace un día precioso en el pueblo.", "type": "town" },
  { "name": "Scoot - Pequeño Alborotador", "greeting": "¡Herborista! ¡Buenos días! Mi madre me ha dicho que venga.", "type": "town" },
  { "name": "Tombo, Pombo y Finnz - 'Duque Beraaz'", "greeting": "¡Maravillosos días! Soy el Duque Beraaz y preciso de los suministros que distribuye usted.", "type": "town" },
  { "name": "Michael - Joven Extraño", "greeting": "¿Qué tal va la jornada, Herborista? ¿Muchos clientes? ¿Te aburres?", "type": "wildcard" }
];

const items = [
  {
    "id": "i1",
    "item": "Hierba Evergreen",
    "archetype": ["merchant"],
    "desc": "Utilizado de forma común en infusiones calmantes.",
    "price": 1,
    "petitions": [
      "Un cliente necesita una infusión calmante.",
      "¿Tienes un poco de Hierba Evergreen de sobra?",
      "Necesito un poco de hierba para poner en mi té.",
    ]
  },
  {
    "id": "i2",
    "item": "Pétalo de Luna",
    "archetype": ["merchant"],
    "desc": "Se dice que estos pétalos fueron bendecidos por la diosa de los sueños",
    "price": 5,
    "petitions": [
      "Necesito un pétalo de luna para un cliente.",
      "¿Te queda algún pétalo?",
      "Algo para dormir. ¡Pero que no sea una poción! Solo el ingrediente.",
    ]
  },
  {
    "id": "i3",
    "item": "Raíz de Piedra",
    "archetype": ["merchant"],
    "desc": "Algunos animales la usan para endurecer sus colmillos.",
    "price": 10,
    "petitions": [
      "Un cliente tiene los dientes fatales. Una poción no va a servir, dice que no quiere meterse eso en el cuerpo.",
      "Ando un poco escaso de unidades de raíz de piedra. ¿Tienes?",
      "Dicen que las raíces de piedra son muy saludables. Mejor llevar alguna encima.",
    ]
  },
  {
    "id": "i4a",
    "item": "Polen Vulcano Activo",
    "archetype": ["merchant"],
    "desc": "Cocineros prestigiosos Ravashies lo utilizan como especia. Es un tanto picante.",
    "price": 15,
    "petitions": [
      "Me han encargado especias exóticas. ¿Tienes algo?",
      "Hoy me apetece comer picante.",
      "He oído que el polen vulcano activo es un magnífico exfoliante.",
    ]
  },
  {
    "id": "i4b",
    "item": "Polen Vulcano Durmiente",
    "archetype": ["merchant"],
    "desc": "Cocineros prestigiosos Ravashies lo utilizan como especia. Recuerda a menta.",
    "price": 15,
    "petitions": [
      "Un socio se hace el té con polen vulcano durmiente. ¿Tienes una pizca?",
      "Me han contado que puedes limpiarte los dientes con el polen de menta.",
      "Dame una bolsa de polen frío, me han encargado que la recoja.",
    ]
  },
  {
    "id": "i5",
    "item": "Hojas de Aurora",
    "archetype": ["merchant"],
    "desc": "Unas hojas cristalinas. Trituradas, recuerdan a las auroras boreales.",
    "price": 20,
    "petitions": [
      "¿Sabías que puedes hacer maquillaje con las hojas de aurora?",
      "La escuela del pueblo me ha encargado que te compre hojas para hacer purpurina.",
      "Un cliente me ha pedido una hoja brillante. ¿Te sobran?",
    ]
  },
  {
    "id": "i6",
    "item": "Fruto de Aurora",
    "archetype": ["merchant"],
    "desc": "Una baya cristalina. Es una planta tan débil que sus hojas se rompen en cuanto se cosecha el fruto.",
    "price": 25,
    "petitions": [
      "Un cliente muy sibarita me ha encargado que le busque frutos de cristal. ¿Tienes?",
      "Hay gente que se puede permitir cocinar con frutos de aurora. Estoy de recados.",
      "¿Tienes de esa planta débil? Las hojas no, el fruto.",
    ]
  },
  {
    "id": "1",
    "item": "Poción de Curación Menor",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Ayuda a calmar heridas pequeñas y malestar general.",
    "price": 5,
    "petitions": [
      "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
      "He cogido un resfriado y me siento fatal.",
      "Creo que tengo fiebre... ¿Tienes algo que ayude?",
      "He comido algo en mal estado y me siento muy mal. ¿Puede que esté envenenado?",
      "Me he hecho una quemadura mientras cocinaba. ¿Tienes algún remedio?",
      "He tocado algo muy frío y me ha salido una quemadura por congelación."
    ]
  },
  {
    "id": "2",
    "item": "Poción Contra Pesadillas",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Sus propiedades consiguen mantener una mente calmada mientras se duerme.",
    "price": 9,
    "petitions": [
      "Últimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
      "No paro de tener pesadillas, no puedo pegar ojo."
    ]
  },
  {
    "id": "3",
    "item": "Poción Contra Resfriado",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Una poción muy eficaz contra resfriados comunes.",
    "price": 15,
    "petitions": [
      "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
      "He cogido un resfriado y me siento fatal."
    ]
  },
  {
    "id": "4",
    "item": "Poción Contra Fiebre",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Una poción muy eficaz contra fiebre común.",
    "price": 15,
    "petitions": [
      "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
      "Creo que tengo fiebre... ¿Tienes algo que ayude?"
    ]
  },
  {
    "id": "5",
    "item": "Poción Contra Miopía",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Mejora la vista del usuario de forma moderada.",
    "price": 24,
    "petitions": [
      "Creo que me está empeorando la vista, ¿Hay algo que pueda ayudar con eso?",
      "Hoy veo todo muy borroso, no entiendo por qué."
    ]
  },
  {
    "id": "6",
    "item": "Poción Contra Maldiciones",
    "archetype": ["mage", "merchant"],
    "desc": "Envuelve en un resplandor etéreo que actúa como escudo protector contra maldiciones y maleficios a quien lo bebe.",
    "price": 29,
    "petitions": [
      "Me han echado un mal de ojo.",
      "Creo que tengo una maldición, no dejo de perder mi monedero.",
      "Un conocido se ha cruzado con un hechicero malvado y ha sido transformado en un gusano.",
      "Recientemente, he sentido una energía negativa a mi alrededor y creo que puede ser una maldición. ¿Hay algo que pueda beber para protegerme?"
    ]
  },
  {
    "id": "7",
    "item": "Poción Somnífera",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Sume al consumidor en un sueño muy profundo. Usar de forma moderada.",
    "price": 25,
    "petitions": [
      "Últimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
      "No paro de tener pesadillas, no puedo pegar ojo.",
      "Necesito una buena noche de sueño, duermo fatal.",
      "Voy a ir de caza y quiero hacer dardos somníferos."
    ]
  },
  {
    "id": "8",
    "item": "Poción Contra Insomnio",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Ayuda al consumidor a dormirse y regular su reloj de sueño.",
    "price": 14,
    "petitions": [
      "Últimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
      "No paro de tener pesadillas, no puedo pegar ojo.",
      "Necesito una buena noche de sueño, duermo fatal."
    ]
  },
  {
    "id": "9",
    "item": "Poción de Resistencia a Sueño",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "El usuario que tome esta poción podrá quedarse despierto una noche entera. Usar de forma moderada.",
    "price": 37,
    "petitions": [
      "Necesito quedarme una noche sin dormir, tengo muchas cosas que hacer y me falta tiempo.",
      "Hoy voy de misión y no puedo jugarme el quedarme sopa.",
      "He dormido fatal y ahora tengo un sueño horrible, pero tengo muchas cosas que hacer."
    ]
  },
  {
    "id": "10",
    "item": "Poción de visión en la oscuridad",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "Los ojos del usuario se cubrirán de una capa púrpura semitransparente que cede visión nocturna.",
    "price": 42,
    "petitions": [
      "Hoy voy de misión a un lugar muy oscuro. No se si voy a poder ver de forma correcta.",
      "Algún graciosillo ha creado una bola de oscuridad en medio de mi casa y no puedo ver.",
      "Voy a ir de caza y necesito poder bien a mis objetivos."
    ]
  },
  {
    "id": "11",
    "item": "Poción de Sueños Lúcidos",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "El usuario que beba esta poción tendrá más conexión con su subconsciente a la hora de soñar.",
    "price": 53,
    "petitions": [
      "Me gustaría poder controlar lo que hago en mis sueños.",
      "He hecho un amigo en mis sueños, pero cada vez que intento hablar con él, el sueño cambia."
    ]
  },
  {
    "id": "12",
    "item": "Poción de Endurecimiento",
    "archetype": ["adventurer", "merchant"],
    "desc": "Vuelve la piel de quien la beba muy dura durante varias horas.",
    "price": 50,
    "petitions": [
      "¿Tienes algo que me dé más armadura o protección?",
      "Necesito un aumento de defensa.",
      "Voy a un sitio peligroso y quiero poder tener más constitución."
    ]
  },
  {
    "id": "13",
    "item": "Antídoto de veneno",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Cura casi todos los envenenamientos e intoxicaciones conocidos en el reino.",
    "price": 42,
    "petitions": [
      "Me han envenenado y necesito algo para contrarrestar los efectos lo antes posible.",
      "Mi compañero de viaje ha sido picado por una serpiente venenosa. ¿Tienes algún antídoto?",
      "He comido algo en mal estado y me siento muy mal. ¿Puede que esté envenenado?"
    ]
  },
  {
    "id": "14",
    "item": "Poción de Resistencia al Frío",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "El usuario no tendrá frío general mientras que el efecto de esta poción dure.",
    "price": 58,
    "petitions": [
      "El invierno se acerca y mi casa es muy fría. ¿Tienes algo que pueda remediarlo?",
      "Voy a acampar en una zona muy fría y necesito una forma de mantenernos calientes durante la noche."
    ]
  },
  {
    "id": "15",
    "item": "Poción de Resistencia al Calor",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "El usuario no tendrá calor general mientras que el efecto de esta poción dure.",
    "price": 58,
    "petitions": [
      "Se acerca una ola de calor, y mi casa va a ser un horno.",
      "Voy a participar en una carrera de resistencia en un clima caluroso y no quiero sudar."
    ]
  },
  {
    "id": "16",
    "item": "Poción de Agudeza Visual",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "Beber esta poción permite al usuario ver más allá de lo que usualmente puede ver.",
    "price": 74,
    "petitions": [
      "Hoy voy de misión a un lugar muy oscuro. No sé si voy a poder ver de forma correcta.",
      "Hoy veo todo muy borroso, no entiendo por qué.",
      "Voy a ir de caza y necesito poder bien a mis objetivos."
    ]
  },
  {
    "id": "17",
    "item": "Poción de Burbuja Negativa",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "Esta poción envuelve a quien la bebe en una burbuja resistente a ataques mágicos.",
    "price": 91,
    "petitions": [
      "¿Tienes algo que me dé más armadura o protección mágica?",
      "Recientemente, he sentido una energía negativa a mi alrededor y creo que puede ser una maldición. ¿Hay algo que pueda beber para protegerme?"
    ]
  },
  {
    "id": "18",
    "item": "Poción de Área de Calor",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Al verter esta poción, emana calor en área.",
    "price": 75,
    "petitions": [
      "Estamos planeando una reunión al aire libre en una noche fría. ¿Tienes una poción que pueda proporcionar un poco de calor para todos?",
      "El invierno se acerca y mi casa es muy fría. ¿Tienes algo que pueda remediarlo?",
      "Voy a acampar en una zona muy fría y necesito una forma de mantenernos calientes durante la noche."
    ]
  },
  {
    "id": "19",
    "item": "Poción de Área de Frío",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Al verter esta poción, emana frío en área.",
    "price": 75,
    "petitions": [
      "Estamos organizando un evento al aire libre en pleno verano y necesitamos una manera de mantener a todos frescos.",
      "Se acerca una ola de calor, y mi casa va a ser un horno.",
      "Voy a ir a la playa y me voy a llevar helados, pero necesito algo que haga que no se derritan."
    ]
  },
  {
    "id": "20",
    "item": "Poción de Amor",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "El calor de esta poción es capaz de convertir una cena normal en una cena romántica.",
    "price": 66,
    "petitions": [
      "Quiero sorprender a mi pareja con una cena romántica, ¿tienes algo que pueda ayudarme a crear una atmósfera más amorosa?",
      "Me gustaría impresionar a alguien especial con una cena, pero necesito algo que pueda añadir un toque extra de romance."
    ]
  },
  {
    "id": "21",
    "item": "Poción de Desamor",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "El frío de esta poción es capaz de convertir un indicio de interés en una quedada incómoda.",
    "price": 66,
    "petitions": [
      "Recientemente, terminé una relación y necesito algo que me ayude a disipar cualquier rastro de amor residual.",
      "Hay alguien del pueblo que no deja de pedirme salir y no me interesa... Necesito algo para que me deje en paz."
    ]
  },
  {
    "id": "22",
    "item": "Poción de Resistencia a Frío Extremo",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "La poción permite que el usuario resista temperaturas frías extremas",
    "price": 94,
    "petitions": [
      "Voy a emprender un viaje a las regiones más heladas del reino y necesito protegerme del frío extremo."
    ]
  },
  {
    "id": "23",
    "item": "Poción de Resistencia a Calor Extremo",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "La poción permite que el usuario resista temperaturas calientes extremas",
    "price": 94,
    "petitions": [
      "Me aventuraré en el desierto durante días y necesito algo que me proteja del calor abrasador"
    ]
  },
  {
    "id": "24",
    "item": "Poción Contra Congelación",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Remedio muy efectivo contra congelaciones",
    "price": 78,
    "petitions": [
      "He tocado algo muy frío y me ha salido una quemadura por congelación."
    ]
  },
  {
    "id": "25",
    "item": "Poción Contra Quemaduras",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Remedio muy efectivo contra quemaduras",
    "price": 78,
    "petitions": [
      "Me he hecho una quemadura mientras cocinaba. ¿Tienes algún remedio?"
    ]
  },
  {
    "id": "26",
    "item": "Poción de Visión Térmica",
    "archetype": ["adventurer", "merchant"],
    "desc": "Los ojos del usuario se cubrirán de una capa naranja semitransparente que permite distinguir temperatura por colores",
    "price": 108,
    "petitions": [
      "Hoy voy de misión a un lugar muy oscuro. No sé si voy a poder ver de forma correcta.",
      "Voy a ir de caza y necesito poder bien a mis objetivos."
    ]
  },
  {
    "id": "27",
    "item": "Poción de Invisibilidad",
    "archetype": ["adventurer", "merchant"],
    "desc": "Esparcido sobre la piel, hace que la luz no se refleje sobre el afectado, volviéndolo invisible temporalmente.",
    "price": 100,
    "petitions": [
      "Voy a colarme en un sitio y no quiero que nadie me vea.",
      "¿Tienes algo para... pasar desapercibido?"
    ]
  },
  {
    "id": "28",
    "item": "Poción de Ver Invisibilidad",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "Los ojos del usuario se cubrirán de una capa azul semitransparente que permite ver siluetas de objetos o criaturas invisibles",
    "price": 82,
    "petitions": [
      "Necesito una poción para poder ver fantasmas.",
      "¿Tienes algo que me permita ver cosas ocultas?"
    ]
  },
  {
    "id": "29",
    "item": "Poción Protectora Ocular",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Esta poción endurece los ojos de quien la beba, permitiendo que no reciban daño.",
    "price": 106,
    "petitions": [
      "Hoy voy a ver un eclipse, es posible que mis ojos reciban daño.",
      "¿Tienes algo que pueda proteger mis ojos?"
    ]
  },
  {
    "id": "30",
    "item": "Poción Contra Ceguera",
    "archetype": ["town", "mage", "adventurer", "merchant"],
    "desc": "Esta poción milagrosa puede llegar a curar ceguera si se aplica de forma correcta.",
    "price": 86,
    "petitions": [
      "He sufrido un accidente que ha dañado gravemente mis ojos y ahora tengo problemas de visión."
    ]
  },
  {
    "id": "31",
    "item": "Poción Alucinatoria",
    "archetype": ["mage", "merchant"],
    "desc": "Cuando alguien se toma esta poción, entra en un estado de trance donde se suelen tener alucinaciones.",
    "price": 140,
    "petitions": [
      "Estoy buscando una experiencia espiritual más profunda y me preguntaba si tienes alguna poción que pueda inducir alucinaciones controladas",
      "Necesito entrar en trance para poder hablar con las diosas."
    ]
  },
  {
    "id": "32",
    "item": "Poción de Restauración Vital",
    "archetype": ["mage", "merchant"],
    "desc": "Envuelve y restaura la energía del ánima del usuario que bebe la poción.",
    "price": 125,
    "petitions": [
      "He perdido muchísima energía mágica. ¿Tienes algo que pueda reponerla?"
    ]
  },
  {
    "id": "33",
    "item": "Poción de Sueños Premonitorios",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "Se ha registrado que tomar esta poción invoca tener sueños premonitorios,",
    "price": 111,
    "petitions": [
      "Estoy tratando de obtener información sobre un posible peligro futuro."
    ]
  },
  {
    "id": "34",
    "item": "Poción de Rejuvenización Vegetal",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "Esta poción es un excelente abono, y revive la mayoría de las plantas que se marchitan.",
    "price": 133,
    "petitions": [
      "Algunas de mis plantas están marchitándose y necesito revivirlas.",
      "Una plaga ha marchitado mi jardín y no se que hacer."
    ]
  },
  {
    "id": "35",
    "item": "Poción de Aliento de Fuego",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "En cuanto esta poción se bebe, el consumidor escupirá una ráfaga de fuego por la boca.",
    "price": 139,
    "petitions": [
      "Estoy preparándome para una batalla épica y me gustaría poder lanzar fuego como un dragón.",
      "¿Tienes algo que pueda hacerme parecer un dragón?"
    ]
  },
  {
    "id": "36",
    "item": "Poción de Aliento de Hielo",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "En cuanto esta poción se bebe, el consumidor escupirá una ráfaga de hielo por la boca.",
    "price": 139,
    "petitions": [
      "Quiero añadir un toque gélido a mis habilidades de combate. ¿Tienes alguna poción que me permita lanzar ráfagas de hielo?"
    ]
  },
  {
    "id": "37",
    "item": "Poción de Detectar Magia",
    "archetype": ["mage", "adventurer", "merchant"],
    "desc": "Una vez tomada esta poción, el usuario verá un contorno leve alrededor de todo lo que sea mágico y esté cerca de él.",
    "price": 160,
    "petitions": [
      "Sospecho que hay fuerzas mágicas en juego a mi alrededor. ¿Tienes alguna poción que pueda ayudarme a detectar la magia cercana?",
      "He perdido mi amuleto protector. Debería de ser capaz de encontrarlo si tienes algo que me permita buscar magia."
    ]
  },
  {
    "id": "38",
    "item": "Poción extraña",
    "archetype": ["wildcard"],
    "desc": "No tienes claro que hace esta poción...pero no te la tomarías.",
    "price": 40,
    "petitions": [
      "Aún vendes pociones, ¿Verdad? ¿Hay alguna que no uses? Puedo quedármela."
    ]
  }
]

var upgradesData = [
  { id: 'hasPetalos', imgroute: 'ruta1.jpg', title: 'Flor de Luna', text: 'Se dice que sus pétalos fueron bendecidos por la diosa de los sueños. <br> Comprar este ingrediente lo añade al jardín. Tarda 5 segundos en crecer una vez se recoge.', price: 10 },
  { id: 'hasRaices', imgroute: 'ruta2.jpg', title: 'Raíces de Piedra', text: 'Pequeñas raíces conocidas por sus propiedades de endurecimiento. <br> Comprar este ingrediente lo añade al jardín. Tarda 15 segundos en crecer una vez se recoge.', price: 20 },
  { id: 'hasPolen', imgroute: 'ruta3.jpg', title: 'Flores Vulcano', text: 'Una flor que produce polen de dos tipos, relacionado de forma común con la temperatura. <br> Comprar este ingrediente lo añade al jardín. Tarda 30 segundos en crecer una vez se recoge. Se añade un interruptor para cosechar un polen u otro.', price: 30 },
  { id: 'hasAurora', imgroute: 'ruta4.jpg', title: 'Frutos de Aurora', text: 'Un fruto escaso por su difícil y costosa germinación. Podrás cosechar sus hojas o el fruto entero. <br> Comprar este ingrediente lo añade al jardín. Las hojas tardan 45 segundos en crecer una vez se recogen, y si se recoge el fruto entero, 60 segundos. Se añade un interruptor para cosechar un las hojas o los frutos enteros.', price: 40 }
];