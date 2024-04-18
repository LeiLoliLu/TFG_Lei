const townsfolk = [
    {"name": "Caelynn - Aventurera Escurridiza", "greeting": "Hola, necesito unos suministros.", "type":"adventurer"},
    {"name": "Cawbett - Cuervo Parlanchín", "greeting": "¡Buen día cawmarada Herbolista! Necesito tu ayuda para cawntinuar con mis aventuras.", "type":"adventurer"},
    {"name": "Gin - Pícaro Kobold", "greeting": "Pssst. ¡Hola! Necesito una cosita.", "type":"adventurer"},
    {"name": "Longrim Wymberforged - Druida Viajero", "greeting": "Buenas tardes, rapaz. Hoy hace un día mágico, ¿No le parece?", "type":"adventurer"},
    {"name": "Maccon Iceblood - Cazador del pueblo", "greeting": "¿Tienes mucho lío? Intentaré pedir rápido.", "type":"adventurer"},
    {"name": "Ignatius Centelleante - Mago Elemental en Prácticas", "greeting": "Ho-hola. Necesito una cosa para clase.", "type":"mage"},
    {"name": "Maeve Silvermoon - Oráculo Lunar", "greeting": "Muy buen dia, Herborista. ¿Saldrás por la noche? La luna va a estar preciosa.", "type":"mage"},
    {"name": "Palmeadus Pico de Rubí - Gran Archimago", "greeting": "Saludos, joven mortal. Requiero tus servicios una vez más.", "type":"mage"},
    {"name": "Stretch y Stitches - Gemelos Ilusionistas", "greeting": "(ambos a la vez) ¡Hola, hola!", "type":"mage"},
    {"name": "Eloise Sapeye - Médica Errante", "greeting": "Hola... Estoy de paso. Tu tienda es realmente preciosa.", "type":"merchant"},
    {"name": "Glob - Mercader Gelatinoso", "greeting": "Uy...Te he llenado la entrada de babas. Lo siento.", "type":"merchant"},
    {"name": "Solor Maeafin - Vendedor de Micelio", "greeting": "¡Buenos días! Necesito un favorcillo. ¡Será rápido!", "type":"merchant"},
    {"name": "Amely Lawkin - Alcaldesa Nerviosa", "greeting": "¡Muy buenos dias! Me alegra verte por aquí. Aunque, siendo sinceros, sería raro que no lo estuvieras, jaja.", "type":"town"},
    {"name": "Daph Swiftstride - Mensajero Centauro", "greeting": "¡Tengo prisa y mucho trabajo así que vamos al grano!", "type":"town"},
    {"name": "Eldric Stonemantle - Forjador Enano", "greeting": "Buenas tardes. ¿Te pillo en buen momento?", "type":"town"},
    {"name": "Helga Barbafresca - Dueña de la taverna del pueblo", "greeting": "¡Buenos días por la mañana! Espero que hayas desayunado.", "type":"town"},
    {"name": "Isabel Hojaoliva - Abuelita Adorable", "greeting": "Hola, joven. Hace un día precioso en el pueblo.", "type":"town"},
    {"name": "Scoot - Pequeño Alborotador", "greeting": "¡Herborista! ¡Buenos días! Mi madre me ha dicho que venga.", "type":"town"},
    {"name": "Tombo, Pombo y Finnz - 'Duque Beraaz'", "greeting": "¡Maravillosos días! Soy el Duque Beraaz y preciso de los suministros que distribuye usted.", "type":"town"},
    {"name": "Michael - Joven Extraño", "greeting": "¿Qué tal va la jornada, Herborista? ¿Muchos clientes? ¿Te aburres?", "type":"wildcard"}
];

const items = [
    {
      "item": "Curación Menor",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Ayuda a calmar heridas pequeñas y malestar general.",
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
      "item": "Contra Pesadillas",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Sus propiedades consiguen mantener una mente calmada mientras se duerme.",
      "petitions": [
        "Ultimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
        "No paro de tener pesadillas, no puedo pegar ojo."
      ]
    },
    {
      "item": "Contra Resfriado",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Una poción muy eficaz contra resfriados comunes.",
      "petitions": [
        "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
        "He cogido un resfriado y me siento fatal."
      ]
    },
    {
      "item": "Contra Fiebre",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Una poción muy eficaz contra fiebre común.",
      "petitions": [
        "Me he levantado con un dolor de cabeza, ¿tienes algo que me pueda ayudar?",
        "Creo que tengo fiebre... ¿Tienes algo que ayude?"
      ]
    },
    {
      "item": "Contra Miopia",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Mejora la vista del usuario de forma moderada.",
      "petitions": [
        "Creo que me está empeorando la vista, ¿Hay algo que pueda ayudar con eso?",
        "Hoy veo todo muy borroso, no entiendo porqué."
      ]
    },
    {
      "item": "Contra Maldiciones",
      "archetype": ["mage"],
      "desc": "Envuelve en un resplandor etéreo que actúa como escudo protector contra maldiciones y maleficios a quien lo bebe.",
      "petitions": [
        "Me han hechado un mal de ojo.",
        "Creo que tengo una maldición, no dejo de perder mi monedero.",
        "Un conocido se ha cruzado con un hechizero malvado y ha sido transformado en un gusano.",
        "Recientemente he sentido una energía negativa a mi alrededor y creo que puede ser una maldición. ¿Hay algo que pueda beber para protegerme?"
      ]
    },
    {
      "item": "Somnifero",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Sume a el consumidor en un sueño muy profundo. Usar de forma moderada.",
      "petitions": [
        "Ultimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
        "No paro de tener pesadillas, no puedo pegar ojo.",
        "Necesito una buena noche de sueño, duermo fatal.",
        "Voy a ir de caza y quiero hacer dardos somniferos."
      ]
    },
    {
      "item": "Contra Insomnio",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Ayuda al consumidor a dormirse y regular su reloj de sueño.",
      "petitions": [
        "Ultimamente no puedo dormir bien. ¿Puedes darme algo que ayude?",
        "No paro de tener pesadillas, no puedo pegar ojo.",
        "Necesito una buena noche de sueño, duermo fatal."
      ]
    },
    {
      "item": "Resistencia a sueño",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "El usuario que tome esta poción podrá quedarse despierto una noche entera. Usar de forma moderada.",
      "petitions": [
        "Necesito quedarme una noche sin dormir, tengo muchas cosas que hacer y me falta tiempo.",
        "Hoy voy de misión y no puedo jugarme el quedarme sopa.",
        "He dormido fatal y ahora tengo un sueño horrible, pero tengo muchas cosas que hacer."
      ]
    },
    {
      "item": "Ver en la oscuridad",
      "archetype": ["mage","adventurer"],
      "desc": "Los ojos del usuario se cubrirán de una capa purpura semitransparente que cede visión nocturna.",
      "petitions": [
        "Hoy voy de misión a un lugar muy oscuro. No se si voy a poder ver de forma correcta.",
        "Algun graciosillo ha creado una bola de oscuridad en medio de mi casa y no puedo ver.",
        "Voy a ir de caza y necesito poder bien a mis objetivos."
      ]
    },
    {
      "item": "Sueños Lúcidos",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "El usuario que beba esta poción tendrá mas conexión con su subconsciente a la hora de soñar.",
      "petitions": [
        "Me gustaría poder controlar lo que hago en mis sueños.",
        "He hecho un amigo en mis sueños pero cada vez que intento hablar con él, el sueño cambia."
      ]
    },
    {
      "item": "Endurecimiento",
      "archetype": ["adventurer"],
      "desc": "Vuelve la piel de quien la beba muy dura durante varias horas.",
      "petitions": [
        "¿Tienes algo que me de mas armadura o protección?",
        "Necesito un aumento de defensa.",
        "Voy a un sitio peligroso y quiero poder tener mas constitución."
      ]
    },
    {
      "item": "Antidoto de veneno",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Cura casi todos los envenenamientos e intoxicaciones conocidos en el reino.",
      "petitions": [
        "Me han envenenado y necesito algo para contrarrestar los efectos lo antes posible.",
        "Mi compañero de viaje ha sido picado por una serpiente venenosa. ¿Tienes algún antídoto?",
        "He comido algo en mal estado y me siento muy mal. ¿Puede que esté envenenado?"
      ]
    },
    {
      "item": "Resistencia al Frio",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "El usuario no tendrá frio general mientras que el efecto de esta poción dure.",
      "petitions": [
        "El invierno se acerca y mi casa es muy fria. ¿Tienes algo que pueda remediarlo?",
        "Voy a acampar en una zona muy fría y necesito una forma de mantenernos calientes durante la noche."
      ]
    },
    {
      "item": "Resistencia al Calor",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "El usuario no tendrá calor general mientras que el efecto de esta poción dure.",
      "petitions": [
        "Se acerca una ola de calor, y mi casa va a ser un horno.",
        "Voy a participar en una carrera de resistencia en un clima caluroso y no quiero sudar."
      ]
    },
    {
      "item": "Agudeza Visual",
      "archetype": ["mage","adventurer"],
      "desc": "Beber esta poción permite al usuario ver mas allá de lo que usualmente puede ver.",
      "petitions": [
        "Hoy voy de misión a un lugar muy oscuro. No se si voy a poder ver de forma correcta.",
        "Hoy veo todo muy borroso, no entiendo porqué.",
        "Voy a ir de caza y necesito poder bien a mis objetivos."
      ]
    },
    {
      "item": "Burbuja negativa",
      "archetype": ["mage","adventurer"],
      "desc": "Esta poción envuelve a quien la bebe en una burbuja resistente a ataques mágicos.",
      "petitions": [
        "¿Tienes algo que me de más armadura o protección mágica?",
        "Recientemente he sentido una energía negativa a mi alrededor y creo que puede ser una maldición. ¿Hay algo que pueda beber para protegerme?"
      ]
    },
    {
      "item": "Area de Calor",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Al verter esta poción, emana calor en area.",
      "petitions": [
        "Estamos planeando una reunión al aire libre en una noche fría. ¿Tienes una poción que pueda proporcionar un poco de calor para todos?",
        "El invierno se acerca y mi casa es muy fria. ¿Tienes algo que pueda remediarlo?",
        "Voy a acampar en una zona muy fría y necesito una forma de mantenernos calientes durante la noche."
      ]
    },
    {
      "item": "Area de Frio",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Al verter esta poción, emana frio en area.",
      "petitions": [
        "Estamos organizando un evento al aire libre en pleno verano y necesitamos una manera de mantener a todos frescos.",
        "Se acerca una ola de calor, y mi casa va a ser un horno.",
        "Voy a ir a la playa y me voy a llevar helados, pero necesito algo que haga que no se derritan."
      ]
    },
    {
      "item": "Amor",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "El calor de esta poción es capaz de convertir una cena normal en una cena romantica.",
      "petitions": [
        "Quiero sorprender a mi pareja con una cena romántica, ¿tienes algo que pueda ayudarme a crear una atmósfera más amorosa?",
        "Me gustaría impresionar a alguien especial con una cena, pero necesito algo que pueda añadir un toque extra de romance."
      ]
    },
    {
      "item": "Desamor",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "El frio de esta poción es capaz de convertir un indicio de interes en una quedada incomoda.",
      "petitions": [
        "Recientemente terminé una relación y necesito algo que me ayude a disipar cualquier rastro de amor residual.",
        "Hay alguien del pueblo que no deja de pedirme salir y no me interesa... Necesito algo para que me deje en paz."
      ]
    },
    {
      "item": "Resistencia a Frio Extremo",
      "archetype": ["mage","adventurer"],
      "desc": "La poción permite que el usuario resista temperaturas frias extremas",
      "petitions": [
        "Voy a emprender un viaje a las regiones más heladas del reino y necesito protegerme del frío extremo."
      ]
    },
    {
      "item": "Resistencia a Calor Extremo",
      "archetype": ["mage","adventurer"],
      "desc": "La poción permite que el usuario resista temperaturas calientes extremas",
      "petitions": [
        "Me aventuraré en el desierto durante días y necesito algo que me proteja del calor abrasador"
      ]
    },
    {
      "item": "Contra Congelación",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Remedio muy efectivo contra congelaciones",
      "petitions": [
        "He tocado algo muy frio y me ha salido una quemadura por congelación."
      ]
    },
    {
      "item": "Contra Quemaduras",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Remedio muy efectivo contra quemaduras",
      "petitions": [
        "Me he hecho una quemadura mientras cocinaba. ¿Tienes algún remedio?"
      ]
    },
    {
      "item": "Visión Termica",
      "archetype": ["adventurer"],
      "desc": "Los ojos del usuario se cubrirán de una capa naranja semitransparente que permite distinguir temperatura por colores",
      "petitions": [
        "Hoy voy de misión a un lugar muy oscuro. No se si voy a poder ver de forma correcta.",
        "Voy a ir de caza y necesito poder bien a mis objetivos."
      ]
    },
    {
      "item": "Invisibilidad",
      "archetype": ["adventurer"],
      "desc": "Esparcido sobre la piel, hace que la luz no se refleje sobre el afectado, volviendolo invisible temporalmente.",
      "petitions": [
        "Voy a colarme en un sitio y no quiero que nadie me vea.",
        "¿Tienes algo para... pasar desapercibido?"
      ]
    },
    {
      "item": "Ver invisibilidad",
      "archetype": ["mage","adventurer"],
      "desc": "Los ojos del usuario se cubrirán de una capa azul semitransparente que permite ver siluetas de objetos o criaturas invisibles",
      "petitions": [
        "Necesito una poción para poder ver fantasmas.",
        "¿Tienes algo que me permita ver cosas ocultas?"
      ]
    },
    {
      "item": "Capa protectora Ocular",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Esta poción endurece los ojos de quien la beba, permitiendo que no reciban daño.",
      "petitions": [
        "Hoy voy a ver un eclipse, es posible que mis ojos reciban daño.",
        "¿Tienes algo que pueda proteger mis ojos?"
      ]
    },
    {
      "item": "Contra Ceguera",
      "archetype": ["townsfolk","mage","adventurer"],
      "desc": "Esta poción milagrosa puede llegar a curar ceguera si se aplica de forma correcta.",
      "petitions": [
        "He sufrido un accidente que ha dañado gravemente mis ojos y ahora tengo problemas de visión."
      ]
    },
    {
      "item": "Provoca Alucinaciones",
      "archetype": ["mage"],
      "desc": "Cuando alguien se toma está poción, entra en un estado de trance donde se suelen tener alucinaciones.",
      "petitions": [
        "Estoy buscando una experiencia espiritual más profunda y me preguntaba si tienes alguna poción que pueda inducir alucinaciones controladas",
        "Necesito entrar en trance para poder hablar con las diosas."
      ]
    },
    {
      "item": "Restauración Vital",
      "archetype": ["mage"],
      "desc": "Envuelve y restaura la energía del ánima del usuario que bebe la poción.",
      "petitions": [
        "He perdido muchisima energía magica. ¿Tienes algo que pueda reponerla?"
      ]
    },
    {
      "item": "Sueños Premonitorios",
      "archetype": ["mage","adventurer"],
      "desc": "Se ha registrado que tomar esta poción invoca tener sueños premonitorios,",
      "petitions": [
        "Estoy tratando de obtener información sobre un posible peligro futuro."
      ]
    },
    {
      "item": "Rejuvenización Vegetal",
      "archetype": ["mage","adventurer"],
      "desc": "Esta poción es un excelente abono, y revive la mayoria de las plantas que se marchitan.",
      "petitions": [
        "Algunas de mis plantas están marchitándose y necesito revivirlas.",
        "Una plaga ha marchitado mi jardín y no se que hacer."
      ]
    },
    {
      "item": "Aliento de Fuego",
      "archetype": ["mage","adventurer"],
      "desc": "En cuanto esta poción se bebe, el consumidor escupirá una rafaga de fuego por la boca.",
      "petitions": [
        "Estoy preparándome para una batalla épica y me gustaría poder lanzar fuego como un dragón.",
        "¿Tienes algo que pueda hacerme parecer un dragón?"
      ]
    },
    {
      "item": "Aliento de Hielo",
      "archetype": ["mage","adventurer"],
      "desc": "En cuanto esta poción se bebe, el consumidor escupirá una rafaga de hielo por la boca.",
      "petitions": [
        "Quiero añadir un toque gélido a mis habilidades de combate. ¿Tienes alguna poción que me permita lanzar ráfagas de hielo?"
      ]
    },
    {
      "item": "Detectar Mágia",
      "archetype": ["mage","adventurer"],
      "desc": "Una vez tomada esta poción el usuario verá un contorno leve alrededor de todo lo que sea mágico y esté cerca suyo.",
      "petitions": [
        "Sospecho que hay fuerzas mágicas en juego a mi alrededor. ¿Tienes alguna poción que pueda ayudarme a detectar la magia cercana?",
        "He perdido mi amuleto protector. Deberia de ser capaz de encontrarlo si tienes algo que me permita buscar magia."
      ]
    },
    {
      "item": "Pocion extraña",
      "archetype": ["wildcard"],
      "desc": "No tienes claro que hace esta poción...pero no te la tomarías.",
      "petitions": [
        "Aún vendes pociones, ¿Verdad? ¿Hay alguna que no uses? Puedo quedarmela."
      ]
    }
  ]
  
