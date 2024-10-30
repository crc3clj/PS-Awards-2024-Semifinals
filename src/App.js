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
  pm:  ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  pc:  ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  mse: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  tef: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  qmm: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  qmml: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  ctg: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  hrl: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  log: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  fcm: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings'],
  qmmc: ['1. MOE3 Milling Pool - PCB edge delamination', '2. Person injured by falling down', '3. Prevention of Retractable Clamp Detachment', '4. SKD16 VC1CP019 pushed-out bushings']

};

const defineProjects ={

    '1. MOE3 Milling Pool - PCB edge delamination': 'TEF',
    '2. Person injured by falling down': 'MOE2',
    '3. Prevention of Retractable Clamp Detachment': 'MOE1',
    '4. SKD16 VC1CP019 pushed-out bushings': 'MOE2',
};

const defineProjectLeader = {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Batan Alexandru',
    '2. Person injured by falling down': 'Boda Mihai-Adrian',
    '3. Prevention of Retractable Clamp Detachment': 'Megyesi Lorand',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Pieper Steffen',
};

const initialNotes = {
  pm: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination PM',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down PM',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment PM',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings PM',
  },

  pc: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination PC',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down PC',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment PC',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings PC',
  },

  mse: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination MSE',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down MSE',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment MSE',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings MSE',
  },

  tef: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination TEF',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down TEF',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment TEF',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings TEF',
  },

  qmm: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination QMM',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down QMM',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment QMM',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings QMM',
  },

  qmml: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination QMM-L',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down QMM-L',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment QMM-L',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings QMM-L',
  },

  ctg: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination CTG',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down CTG',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment CTG',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings CTG',
  },

  hrl: {
    '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination HRL',
    '2. Person injured by falling down': 'Notes 2. Person injured by falling down HRL',
    '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment HRL',
    '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings HRL',
  },

    log: {
      '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination LOG',
      '2. Person injured by falling down': 'Notes 2. Person injured by falling down LOG',
      '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment LOG',
      '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings LOG',
    },
  
    fcm: {
      '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination FCM',
      '2. Person injured by falling down': 'Notes 2. Person injured by falling down FCM',
      '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment FCM',
      '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings FCM',
    },
    qmmc: {
      '1. MOE3 Milling Pool - PCB edge delamination': 'Notes 1. MOE3 Milling Pool - PCB edge delamination FCM',
      '2. Person injured by falling down': 'Notes 2. Person injured by falling down FCM',
      '3. Prevention of Retractable Clamp Detachment': 'Notes 3. Prevention of Retractable Clamp Detachment FCM',
      '4. SKD16 VC1CP019 pushed-out bushings': 'Notes 4. SKD16 VC1CP019 pushed-out bushings FCM',
    },
  };

const departmentCriteria = {
  'pm': ["D5 and D6", "KPI Improvement"],
  'pc': ["D5 and D6", "KPI Improvement"],
  'mse': ["D5 and D6", "KPI Improvement"],
  'tef': ["D5 and D6", "KPI Improvement"],
  'qmm': ["D5 and D6", "KPI Improvement"],
  'qmml': ["D5 and D6", "KPI Improvement"],
  'ctg': ["D5 and D6", "KPI Improvement"],
  'hrl': ["D5 and D6", "KPI Improvement"],
  'log': ["D5 and D6", "KPI Improvement"],
  'fcm': ["D5 and D6", "KPI Improvement"],
  'qmmc': ["D5 and D6", "KPI Improvement"],
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
      const psMethodAverage = (ratings['category1'] + ratings['category2'] + ratings['category3']);
      const kpiImprovementAverage = (ratings['kpi-improvement-category1'] + ratings['kpi-improvement-category2']);
      // Obținem notele pentru proiectul curent bazat pe 'projectNumber'
      const projectNotes = notes[selectedDepartment]?.[projects[selectedDepartment][projectNumber - 1]] || '';
  
      return {
        "D5 and D6": psMethodAverage,
        "KPI Improvement": kpiImprovementAverage,
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
  
    for (let i = 0; i <=3; i++) {
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
                '2. Person injured by falling down': resetRatings(),
                '3. Prevention of Retractable Clamp Detachment': resetRatings(),
                '4. SKD36 VC1CP019 pushed-out bushings': resetRatings(),
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
  "D5 and D6": ['category1', 'category2', 'category3'],
  "KPI Improvement": ['kpi-improvement-category1', 'kpi-improvement-category2'],
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
      <h1>PS Awards Digital Booklet 2024 - Seminals</h1>
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
          {selectedDepartment && departmentCriteria[selectedDepartment].includes("D5 and D6") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">
              D5 and D6
              </label>
            </div>
            <label className="text-left">
              1. Are measures defined for all identified root causes? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category1', 5)}
            <label className="text-left">
              2. Has the effectiveness of the actions been proven? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category2', 5) }
            <label className="text-left">
              3. Are the risks associated with corrective measures identified? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category3', 5)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("KPI Improvement") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">KPI Improvement</label>
            </div>
            <label className="text-left">
              1. Concrete and coherent data regarding the improvement of performance indicators 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category1', 5)}
            <label className="text-left">
              2. Proof of the sustainability of measures and implementation of measures with long-term effects 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category2', 5)}
          </div>)}


          <button type="submit" className="submit-button" disabled={!formIsValid}>Submit</button>
        </div>
      )}</form>
    </div>
  );
}
export default App;
