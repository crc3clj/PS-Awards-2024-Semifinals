import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useMemo } from 'react';
const departments = [
  // { id: 'pm' , name: 'PM - Oezmeral Hueseyin'  },
  // { id: 'pc' , name: 'PC - Constantinescu Monica'  },
  { id: 'mse', name: 'PC - Monica Constantinescu' },
  { id: 'tef', name: 'TEF - Radu Harceaga' },
  { id: 'qmm', name: 'QMM - Keiser Reimund' },
  { id: 'qmml', name: 'QMM-L - Sergiu Erdei' },
  { id: 'ctg', name: 'CTG - Szocs Csongor' },
  { id: 'hrl', name: 'HRL - Motoc Simina' },
  { id: 'log', name: 'LOG - Hastemir Bekir' },
  { id: 'fcm', name: 'FCM - Gyori Botond' },
  { id: 'qmmc', name: 'QMM-C - Marius Rusu' },
];

const projects = {
  pm:  ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  pc:  ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  mse: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  tef: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  qmm: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  qmml: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  ctg: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  hrl: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  log: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  fcm: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment'],
  qmmc: ['1. MOE3 Milling Pool - PCB edge delamination', '2. JLR Ford parts mix', '3. FC 100x higher on QFN 48 pin', '4. SKD16 VC1CP019 pushed-out bushings', '5. Person injured by falling down', '6. Internal transport damage', '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '8. Prevention of Retractable Clamp Detachment']

};

const defineProjects ={

    '1. MOE3 Milling Pool - PCB edge delamination': 'TEF',
    '2. JLR Ford parts mix': 'LOG',
    '3. FC 100x higher on QFN 48 pin': 'MOE1',
    '4. SKD16 VC1CP019 pushed-out bushings': 'MOE2',
    '5. Person injured by falling down': 'MOE2',
    '6. Internal transport damage': 'LOG',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'MOE1',
    '8. Prevention of Retractable Clamp Detachment': 'MOE1',
};

const defineProjectLeader = {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Batan Alexandru',
    '2. JLR Ford parts mix': 'Monica Jucan',
    '3. FC 100x higher on QFN 48 pin': 'Jaewon Jeong',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Pieper Steffen',
    '5. Person injured by falling down': 'Boda Mihai-Adrian',
    '6. Internal transport damage': 'Aiben Mihai',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Sava Paul-Melinte',
    '8. Prevention of Retractable Clamp Detachment': 'Megyesi Lorand',
};

const initialNotes = {
  pm: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination PM',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix PM',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin PM',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings PM',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down PM',
    '6. Internal transport damage': 'Notes 6. Internal transport damage PM',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO PM',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment PM',
  },

  pc: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination PC',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix PC',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin PC',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings PC',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down PC',
    '6. Internal transport damage': 'Notes 6. Internal transport damage PC',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO PC',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment PC',
  },

  mse: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination MSE',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix MSE',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin MSE',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings MSE',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down MSE',
    '6. Internal transport damage': 'Notes 6. Internal transport damage MSE',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO MSE',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment MSE',
  },

  tef: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination TEF',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix TEF',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin TEF',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings TEF',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down TEF',
    '6. Internal transport damage': 'Notes 6. Internal transport damage TEF',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO TEF',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment TEF',
  },

  qmm: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination QMM',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix QMM',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin QMM',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings QMM',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down QMM',
    '6. Internal transport damage': 'Notes 6. Internal transport damage QMM',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO QMM',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment QMM',
  },

  qmml: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination QMM-L',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix QMM-L',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin QMM-L',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings QMM-L',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down QMM-L',
    '6. Internal transport damage': 'Notes 6. Internal transport damage QMM-L',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO QMM-L',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment QMM-L',
  },

  ctg: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination CTG',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix CTG',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin CTG',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings CTG',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down CTG',
    '6. Internal transport damage': 'Notes 6. Internal transport damage CTG',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO CTG',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment CTG',
  },

  hrl: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination HRL',
    '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix HRL',
    '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin HRL',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings HRL',
    '5. Person injured by falling down': 'Notes 5. Person injured by falling down HRL',
    '6. Internal transport damage': 'Notes 6. Internal transport damage HRL',
    '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO HRL',
    '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment HRL',
  },

    log: {
      '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination LOG',
      '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix LOG',
      '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin LOG',
      '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings LOG',
      '5. Person injured by falling down': 'Notes 5. Person injured by falling down LOG',
      '6. Internal transport damage': 'Notes 6. Internal transport damage LOG',
      '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO LOG',
      '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment LOG',
    },
  
    fcm: {
      '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination FCM',
      '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix FCM',
      '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin FCM',
      '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings FCM',
      '5. Person injured by falling down': 'Notes 5. Person injured by falling down FCM',
      '6. Internal transport damage': 'Notes 6. Internal transport damage FCM',
      '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO FCM',
      '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment FCM',
    },
    qmmc: {
      '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination FCM',
      '2. JLR Ford parts mix': 'Notes 2. JLR Ford parts mix FCM',
      '3. FC 100x higher on QFN 48 pin': 'Notes 3. FC 100x higher on QFN 48 pin FCM',
      '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings FCM',
      '5. Person injured by falling down': 'Notes 5. Person injured by falling down FCM',
      '6. Internal transport damage': 'Notes 6. Internal transport damage FCM',
      '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO FCM',
      '8. Prevention of Retractable Clamp Detachment': 'Notes 8. Prevention of Retractable Clamp Detachment FCM',
    },
  };

const departmentCriteria = {
  'pm': ["D3 and D4", "Presentation skills"],
  'pc': ["D3 and D4", "Presentation skills"],
  'mse': ["D3 and D4", "Presentation skills"],
  'tef': ["D3 and D4", "Presentation skills"],
  'qmm': ["D3 and D4", "Presentation skills"],
  'qmml': ["D3 and D4", "Presentation skills"],
  'ctg': ["D3 and D4", "Presentation skills"],
  'hrl': ["D3 and D4", "Presentation skills"],
  'log': ["D3 and D4", "Presentation skills"],
  'fcm': ["D3 and D4", "Presentation skills"],
  'qmmc': ["D3 and D4", "Presentation skills"],
};

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [notes, setNotes] = useState(initialNotes);


  // Stare pentru rating-urile pentru fiecare categorie pentru fiecare proiect
  const [projectRatings, setProjectRatings] = useState({});
  useEffect(() => {
    // La schimbarea proiectului, verificați dacă există rating-uri pentru proiectul selectat
    if (selectedProject) {
      if (!projectRatings[selectedProject]) {
        // Dacă nu există rating-uri pentru proiectul selectat, inițializați-le cu rating-uri goale
        setProjectRatings((prevRatings) => ({
          ...prevRatings,
          [selectedProject]: {
            category1: 0,
            category2: 0,
            category3: 0,
            category4: 0,
            category5: 0,
          },
        }));
      }
    }
  }, [selectedProject, projectRatings]); // Adăugați projectRatings ca o dependență aici


  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const savedData = localStorage.getItem('appData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setSelectedDepartment(parsedData.selectedDepartment || '');
        setSelectedProject(parsedData.selectedProject || '');
        setProjectRatings(parsedData.projectRatings || {});
        setNotes(parsedData.projectNotes || {}); // Adaugăm încărcarea notelor
      }
    };

    loadDataFromLocalStorage();
  }, []); // rulează la încărcarea componentei

  const saveToLocalStorage = () => {
    const dataToSave = {
      selectedDepartment,
      selectedProject,
      projectRatings,
      projectNotes:notes
    };
    localStorage.setItem('appData', JSON.stringify(dataToSave));
  };

  const resetAppData = () => {
    localStorage.removeItem('appData');
    setSelectedDepartment('');
    setSelectedProject('');
    setProjectRatings({});
    setNotes('');
  };


  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedProject('');
    setNotes('');
    saveToLocalStorage(); // Salvare la schimbarea proiectului
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    saveToLocalStorage(); // Salvare la schimbarea proiectului
  };

  const handleRatingChange = (project, category, rating) => {
    // Actualizați rating-urile pentru proiectul și categoria selectate
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [project]: {
        ...prevRatings[project],
        [category]: rating,
      },
    }));
    saveToLocalStorage(); // Salvare la acordarea unui rating
  };

  const handleNotesChange = (e) => {
    const updatedNotes = { ...notes };
    if (!updatedNotes[selectedDepartment]) {
      updatedNotes[selectedDepartment] = {};
    }
    updatedNotes[selectedDepartment][selectedProject] = e.target.value;
    setNotes(updatedNotes);
    saveToLocalStorage(); // Salvare la schimbarea notelor
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Adăugăm 'projectNumber' ca al doilea parametru aici
    const calculateDataForProject = (ratings, projectNumber) => {
      const psMethodAverage = (ratings['category1'] + ratings['category2'] + ratings['category3'] + ratings['category4']);
      const kpiImprovementAverage = (ratings['kpi-improvement-category1'] + ratings['kpi-improvement-category2'] + ratings['kpi-improvement-category3']);
      // Obținem notele pentru proiectul curent bazat pe 'projectNumber'
      const projectNotes = notes[selectedDepartment]?.[projects[selectedDepartment][projectNumber - 1]] || '';
  
      return {
        "D3 and D4": psMethodAverage,
        "Presentation skills": kpiImprovementAverage,
        Notes: projectNotes,
      };
    };

    const getURLForProject = (sheetId, projectNumber, rowToUpdate) => {
      return `https://api.sheetbest.com/sheets/${sheetId}/tabs/Project ${projectNumber}/${rowToUpdate}`;
    }
    
    const sheetId = "73dd3db3-a6cf-4f14-b772-0081f4f07507";
    
    const departmentIndex = departments.findIndex(dept => dept.id === selectedDepartment);
    const rowToUpdate = departmentIndex !== -1 ? departmentIndex : 0;
  
    const promises = [];
  
    for (let i = 0; i <=7; i++) {
      const currentProjectName = projects[selectedDepartment][i];
      const currentProjectRatings = projectRatings[currentProjectName];

      if (!currentProjectRatings) {
          console.warn(`Nu există ratinguri pentru Proiectul ${currentProjectName}`);
          continue;
      }
      const data = calculateDataForProject(currentProjectRatings, i + 1);
      const url = getURLForProject(sheetId, i + 1, rowToUpdate);
      promises.push(axios.patch(url, data));
    }
  
    Promise.all(promises)
      .then(responses => {
        console.log('Toate datele au fost trimise cu succes');
        setNotes('');
        setLoading(false);
        setProgress(0);
        // Afișați un mesaj către utilizator pentru succes
            alert('Data was succesfully send!Thank you!');
            // Resetați și rating-urile pentru toate proiectele

            setProjectRatings({
                '1. MOE3 Milling Pool - PCB edge delamination': resetRatings(),
                '2. JLR Ford parts mix': resetRatings(),
                '3. FC 100x higher on QFN 48 pin': resetRatings(),
                '4. SKD36 VC1CP019 pushed-out bushings': resetRatings(),
                '5. Person injured by falling down': resetRatings(),
                '6. Internal transport damage': resetRatings(),
                '7. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': resetRatings(),
                '8. Prevention of Retractable Clamp Detachment': resetRatings()
            });
            resetAppData();
        })
        .catch(error => {
            console.error('A apărut o eroare la trimiterea datelor:', error);
            if (error.response) {
                console.error('Răspuns de la server:', error.response.data);
            }
            setLoading(false);//Dezactiveaza starea de incarcare in caz de eroare
            setProgress(0); //Resetati progresul la 0
        });    
}

const resetRatings = () => {
    return {
        category1: 0,
        category2: 0,
        category3: 0,
        category4: 0,
        category5: 0,
    };
}

//<-----------------------------------------Export Data-------------------------------------------->
const renderRatings = (project, category, maxRating) => {
  const ratingsArray = Array.from({ length: maxRating }, (_, i) => i + 1);

  // Pentru a actualiza un rating specific
  const handleSingleRatingChange = (project, category, rating) => {
    // Setează ratingul pentru categoria specificată
    handleRatingChange(project, category, rating);
  };

  return (
    <div className="ratings">
      {ratingsArray.map((rating, index) => (
        <div
          key={rating}
          className={`rating-option ${
            projectRatings[project]?.[category] === rating ? 'selected' : ''
          }`}
          onClick={() => handleSingleRatingChange(selectedProject, category, rating)}
        >
          {rating}
        </div>
      ))}
    </div>
  );
};

const criteriaToSubcategories = useMemo(() => ({
  "D3 and D4": ['category1', 'category2', 'category3', 'category4', 'category5'],
  "Presentation skills": ['kpi-improvement-category1', 'kpi-improvement-category2', 'kpi-improvement-category3'],
  }), []); // array-ul gol indică faptul că useMemo nu are dependențe și, astfel, valoarea va fi memorată și nu se va schimba între randări

const [formIsValid, setFormIsValid] = useState(false);

// Pentru inițializarea ratingurilor
useEffect(() => {
  if (selectedProject && !projectRatings[selectedProject]) {
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    const initialRatings = {};
    for (const subcategory of relevantSubcategories) {
      initialRatings[subcategory] = 0;
    }
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [selectedProject]: initialRatings,
    }));
  }
}, [selectedProject, selectedDepartment, projectRatings, criteriaToSubcategories]);

// Pentru validarea formularului
useEffect(() => {
  if (!selectedDepartment || !projects[selectedDepartment]) return; // Ieșiți din efect dacă departamentul selectat nu este valid
  
  const allProjectsForDepartment = projects[selectedDepartment];
  
  const allProjectsRated = allProjectsForDepartment.every(project => {
    const ratingsForProject = projectRatings[project] || {};
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    return relevantSubcategories.every(subcategory => ratingsForProject[subcategory] && ratingsForProject[subcategory] !== 0);
  });
  
  setFormIsValid(allProjectsRated);
}, [projectRatings, selectedDepartment, criteriaToSubcategories]);

  return (
    <div className="App">
      {/* Afișați fereastra de încărcare și progresul doar atunci când "loading" este true */}
    {loading && (
      
      <div className="loader-container">
        <div className="loader"></div>
        <div className="progress">{progress}%</div>
      </div>
    )}
      <h1>PS Awards Digital Booklet 2024 - Quarters</h1>
      <form className="dropdown" onSubmit={handleSubmit} >
      <div className='dropdown-container'>
      <div>
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="dropdown-button"
        >
          <option value="">Select department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div></div>
      <div className='dropdown-container'>
      {selectedDepartment && (
        <div className="dropdown">
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            className="dropdown-button"
          >
            <option value="">Select project</option>
            {projects[selectedDepartment].map((project) => (
              <option key={project} value={project}>
                {project}
              </option>     
            ))}
          </select>
        </div>
      )}</div>
      {selectedProject && (
        <div className="form">
          <div className="form-row">
            <label>{selectedProject ? `${selectedProject}` : 'Nume:'}</label>
            <label>{defineProjects[selectedProject]}</label>
          </div>
          <div className="form-row">
            <label>Team Leader:</label>
            <label>{defineProjectLeader[selectedProject]}</label>
            <div>
            <label>Notes:</label>
            <div>
    <textarea
      id="notes"
      className="note-size"
      value={notes[selectedDepartment]?.[selectedProject] || ''}
      onChange={handleNotesChange}
      placeholder="Add your notes here..."
    /><br />
  </div></div></div>
      <div>
          <label><i>*Please select a mark for each project from below</i></label>
          <br />
        
          </div>
          {selectedDepartment && departmentCriteria[selectedDepartment].includes("D3 and D4") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">
              D3 and D4
              </label>
            </div>
            <label className="text-left">
              1. Is a containment action needed? If yes, has this been correctly defined and its effectiveness proven? (rate 0 to 5; 0 - containment not effective, 5 - containment effective) 
            </label>
            {renderRatings(selectedProject, 'category1', 5)}
            <label className="text-left">
              2. Is the system's function understood, and for understanding, have descriptions and graphical representations been used? (rate 0 to 5; 0 - no system understanding, 5 - detailed description of the system) 
            </label>
            {renderRatings(selectedProject, 'category2', 5) }
            <label className="text-left">
              3. Have the direct causes been confirmed or excluded, with evidence? (rate 0 to 5; 0 - direct causes not identified, 5 - evidence available for all direct causes) 
            </label>
            {renderRatings(selectedProject, 'category3', 5)}
            <label className="text-left">
              4. Is the 5-why method applied correctly, can it be validated by reading it backwards? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category4', 5)}
            <label className="text-left">
              5. Have the technical and managerial root causes been identified? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category5', 5)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("Presentation skills") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">Presentation skills</label>
            </div>
            <label className="text-left">
              1. Communication efficiency, body language 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category1', 5)}
            <label className="text-left">
              2. Ability to synthesize information and draw conclusions 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category2', 5)}
            <label className="text-left">
              3. Adherence to the format and maintaining a visual coherence 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category3', 5)}
          </div>)}


          <button type="submit" className="submit-button" disabled={!formIsValid}>Submit</button>
        </div>
      )}</form>
    </div>
  );
}
export default App;
