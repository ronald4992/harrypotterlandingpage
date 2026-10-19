import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory data stores
interface StoredAdmission {
  id: string;
  fullName: string;
  age: number;
  pet: string;
  preferredHouse: string;
  address: string;
  registeredAt: string;
  status: 'Aceptado' | 'En revisión por Lechuza';
}

const admissionsRegistry: StoredAdmission[] = [
  {
    id: 'HOG-1991-001',
    fullName: 'Harry James Potter',
    age: 11,
    pet: 'lechuza',
    preferredHouse: 'gryffindor',
    address: 'Alacena bajo las escaleras, Privet Drive 4, Little Whinging, Surrey',
    registeredAt: '2026-09-01T10:00:00Z',
    status: 'Aceptado'
  }
];

const newsletterSubscribers: { email: string; owlChoice: string; subscribedAt: string }[] = [];

// API Endpoints

// 1. Health & Server Info
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    institution: 'Colegio Hogwarts de Magia y Hechicería',
    system: 'Node.js & TypeScript Magical Server',
    term: '2026-2027',
    headmaster: 'Albus Percival Wulfric Brian Dumbledore',
    currentTime: new Date().toISOString()
  });
});

// 2. Admission Application (CTA 1)
app.post('/api/admission', (req: Request, res: Response) => {
  try {
    const { fullName, age, pet, preferredHouse, address } = req.body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Por favor ingrese un nombre de mago/bruja válido.' });
    }

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 10) {
      return res.status(400).json({ success: false, error: 'La edad mínima para recibir la lechuza de Hogwarts es de 10 años.' });
    }

    const admissionId = `HOG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: StoredAdmission = {
      id: admissionId,
      fullName: fullName.trim(),
      age: ageNum,
      pet: pet || 'lechuza',
      preferredHouse: preferredHouse || 'indiferente',
      address: address?.trim() || 'Dormitorio del ático, Habitación mágica',
      registeredAt: new Date().toISOString(),
      status: 'Aceptado'
    };

    admissionsRegistry.push(newRecord);

    return res.status(201).json({
      success: true,
      message: '¡Carta de Aceptación expedida con éxito!',
      applicationId: admissionId,
      letter: {
        recipient: newRecord.fullName,
        location: newRecord.address,
        deliveryMethod: `Lechuza mensajera oficial con sello de cera escarlata de Hogwarts`,
        deputyHeadmistress: 'Minerva McGonagall (Subdirectora)',
        platform: 'Andén 9¾, Estación de King\'s Cross, Londres',
        termStart: '1 de Septiembre a las 11:00 am en punto',
        acceptedTerms: [
          'Túnicas de trabajo sencillas (negras)',
          'Un sombrero puntiagudo para uso diario',
          'Un caldero de peltre tamaño 2',
          'Un juego de redomas de vidrio o cristal',
          'Una varita mágica oficial de Ollivanders'
        ]
      }
    });
  } catch (error) {
    console.error('Error procesando admisión:', error);
    return res.status(500).json({ success: false, error: 'Encantamiento interferido en el servidor lechuza.' });
  }
});

// 3. Sorting Hat Evaluation (CTA 2)
app.post('/api/sorting', (req: Request, res: Response) => {
  try {
    const { answers } = req.body as { answers?: string[] };
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, error: 'Respuestas de la ceremonia de selección incompletas.' });
    }

    const counts: Record<string, number> = {
      gryffindor: 0,
      slytherin: 0,
      ravenclaw: 0,
      hufflepuff: 0
    };

    answers.forEach((house) => {
      if (counts[house] !== undefined) {
        counts[house]++;
      }
    });

    let assignedHouse = 'gryffindor';
    let maxVotes = -1;
    for (const [house, count] of Object.entries(counts)) {
      if (count > maxVotes) {
        maxVotes = count;
        assignedHouse = house;
      }
    }

    const houseDetails: Record<string, { title: string; speech: string }> = {
      gryffindor: {
        title: '¡GRYFFINDOR!',
        speech: '¡Ah! Veo coraje y valentía indómita. Un corazón que arde ante la injusticia y no teme a las sombras. ¡Tu lugar indiscutible es en Gryffindor!'
      },
      slytherin: {
        title: '¡SLYTHERIN!',
        speech: 'Hmm... astucia sublime, visión de liderazgo y ambición de alcanzar la grandeza. Si sabes usar tu talento, en Slytherin hallarás la gloria.'
      },
      ravenclaw: {
        title: '¡RAVENCLAW!',
        speech: '¡Fascinante! Una mente ávida de sabiduría, perspicacia y pensamiento sin límites. En la alta torre de Ravenclaw tus alas se desplegarán.'
      },
      hufflepuff: {
        title: '¡HUFFLEPUFF!',
        speech: '¡Qué nobleza! Lealtad inquebrantable, tenacidad sin queja y un sentido impecable de justicia. ¡En Hufflepuff serás hermano y protector de todos!'
      }
    };

    return res.json({
      success: true,
      house: assignedHouse,
      announcement: houseDetails[assignedHouse].title,
      speech: houseDetails[assignedHouse].speech,
      scoredPoints: counts
    });
  } catch (error) {
    console.error('Error en la selección:', error);
    return res.status(500).json({ success: false, error: 'El Sombrero Seleccionador está deliberando.' });
  }
});

// 4. Newsletter / El Profeta Subscription (Pre-footer)
app.post('/api/newsletter', (req: Request, res: Response) => {
  try {
    const { email, owlChoice } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Dirección de correo electrónico mágico no válida.' });
    }

    const existing = newsletterSubscribers.find((sub) => sub.email === email);
    if (existing) {
      return res.json({
        success: true,
        message: '¡Ya estás registrado en los registros de El Profeta! Tu próxima edición llegará mañana al amanecer.'
      });
    }

    newsletterSubscribers.push({
      email,
      owlChoice: owlChoice || 'lechuza-real',
      subscribedAt: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: '¡Suscripción confirmada! Tu lechuza mensajera despegará cada mañana con la primera edición matutina.',
      dispatchTime: 'Todas las mañanas a las 06:00 am'
    });
  } catch (error) {
    console.error('Error al suscribir a El Profeta:', error);
    return res.status(500).json({ success: false, error: 'Hubo un error con la red de lechuzas.' });
  }
});

// 5. House Cup & Campus Statistics
app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    activeStudents: 412 + admissionsRegistry.length,
    registeredAdmissions: admissionsRegistry.length,
    housePoints: {
      gryffindor: 482,
      slytherin: 475,
      ravenclaw: 460,
      hufflepuff: 452
    },
    quidditchSeason: 'Copa de las Cuatro Casas 2026',
    platformDeparture: '11:00 am BST'
  });
});

// Serve frontend build if in production
const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

// SPA fallback route for Express v5
app.use((_req: Request, res: Response) => {
  const indexFile = path.join(distPath, 'index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      res.status(200).send('Servidor Mágico Hogwarts API en ejecución. Para la interfaz completa, inicie Vite dev server.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🏰 [Hogwarts Server] Servidor Mágico ejecutándose en http://localhost:${PORT}`);
});
