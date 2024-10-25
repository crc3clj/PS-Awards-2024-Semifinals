import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useMemo } from 'react';
const departments = [
  // { id: 'pm' , name: 'PM - Oezmeral Hueseyin'  },
  // { id: 'pc' , name: 'PC - Constantinescu Monica'  },
  { id: 'mse', name: 'MSE - Touhent Hassene' },
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
  pm:  ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  pc:  ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  mse: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  tef: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  qmm: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  qmml: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  ctg: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  hrl: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  log: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  fcm: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down'],
  qmmc: ['1. FC 100x higher on QFN 48 pin', '2. FABS2 EOL Tester', '3. MOE3 Milling Pool - PCB edge delamination', '4. IvecoMux safety incident with shelfcarriers 1', '5. D716 Damaged component', '6. JLR Ford parts mix', '7. PSS - Laser Marking Machine safety errors', '8. Deviatie de contur Milling 225', '9. ECA_M2_Scontrol_Pseudo Failures', '10. DASy Enhanced MARVEL eFUse_8D_report', '11. SKD16 VC1CP019 pushed-out bushings', '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', '13. Internal transport damage', '14. Damage component –coil L414_1', '15 Prevention of Retractable Clamp Detachment', '16. Person injured by falling down']

};

const defineProjects ={

    '1. FC 100x higher on QFN 48 pin': 'MOE1',
    '2. FABS2 EOL Tester': 'MOE2',
    '3. MOE3 Milling Pool - PCB edge delamination': 'TEF',
    '4. IvecoMux safety incident with shelfcarriers 1': 'MOE4',
    '5. D716 Damaged component': 'MOE4',
    '6. JLR Ford parts mix': 'LOG',
    '7. PSS - Laser Marking Machine safety errors': 'TEF',
    '8. Deviatie de contur Milling 225': 'MOE3',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'MOE3',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'MOE5',
    '11. SKD16 VC1CP019 pushed-out bushings': 'MOE2',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'MOE1',
    '13. Internal transport damage': 'LOG',
    '14. Damage component –coil L414_1': 'MOE5',
    '15 Prevention of Retractable Clamp Detachment': 'MOE1',
    '16. Person injured by falling down': 'MOE2'
    
};

const defineProjectLeader = {
    '1. FC 100x higher on QFN 48 pin': 'Jeong Jaewon',
    '2. FABS2 EOL Tester': 'Eissa Ahmed',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Batan Alexandru',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Pop Daniel ',
    '5. D716 Damaged component': 'Faur Darius',
    '6. JLR Ford parts mix': 'Monica Jucan',
    '7. PSS - Laser Marking Machine safety errors': 'Florean Mihai',
    '8. Deviatie de contur Milling 225': 'Negreanu Daniel',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Tyukodi Krisztian',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Tanase Ionut',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Pieper Steffen',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Sava Paul-Melinte',
    '13. Internal transport damage': 'Aiben Mihai',
    '14. Damage component –coil L414_1': 'Miclea Iulia Laura',
    '15 Prevention of Retractable Clamp Detachment': 'Megyesi Lorand',
    '16. Person injured by falling down': 'Boda Mihai-Adrian'
};

const initialNotes = {
  pm: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin PM',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester PM',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination PM',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 PM',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component PM',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix PM',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors PM',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 PM',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures PM',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report PM',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings PM',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO PM',
    '13. Internal transport damage': 'Notes 13. Internal transport damage PM',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1PM',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment PM',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down PM'
  },

  pc: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin PC',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester PC',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination PC',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 PC',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component PC',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix PC',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors PC',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 PC',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures PC',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report PC',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings PC',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO PC',
    '13. Internal transport damage': 'Notes 13. Internal transport damage PC',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1PC',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment PC',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down PC'
  },

  mse: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin MSE',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester MSE',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination MSE',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 MSE',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component MSE',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix MSE',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors MSE',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 MSE',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures MSE',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report MSE',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings MSE',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO MSE',
    '13. Internal transport damage': 'Notes 13. Internal transport damage MSE',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1MSE',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment MSE',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down MSE'
  },

  tef: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin TEF',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester TEF',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination TEF',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 TEF',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component TEF',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix TEF',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors TEF',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 TEF',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures TEF',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report TEF',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings TEF',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO TEF',
    '13. Internal transport damage': 'Notes 13. Internal transport damage TEF',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1TEF',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment TEF',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down TEF'
  },

  qmm: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin QMM',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester QMM',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination QMM',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 QMM',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component QMM',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix QMM',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors QMM',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 QMM',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures QMM',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report QMM',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings QMM',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO QMM',
    '13. Internal transport damage': 'Notes 13. Internal transport damage QMM',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1QMM',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment QMM',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down QMM'
  },

  qmml: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin QMM-L',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester QMM-L',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination QMM-L',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 QMM-L',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component QMM-L',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix QMM-L',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors QMM-L',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 QMM-L',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures QMM-L',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report QMM-L',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings QMM-L',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO QMM-L',
    '13. Internal transport damage': 'Notes 13. Internal transport damage QMM-L',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1QMM-L',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment QMM-L',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down QMM-L'
  },

  ctg: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin CTG',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester CTG',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination CTG',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 CTG',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component CTG',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix CTG',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors CTG',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 CTG',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures CTG',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report CTG',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings CTG',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO CTG',
    '13. Internal transport damage': 'Notes 13. Internal transport damage CTG',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1CTG',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment CTG',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down CTG'
  },

  hrl: {
    '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin HRL',
    '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester HRL',
    '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination HRL',
    '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 HRL',
    '5. D716 Damaged component': 'Notes 5. D716 Damaged component HRL',
    '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix HRL',
    '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors HRL',
    '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 HRL',
    '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures HRL',
    '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report HRL',
    '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings HRL',
    '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO HRL',
    '13. Internal transport damage': 'Notes 13. Internal transport damage HRL',
    '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1HRL',
    '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment HRL',
    '16. Person injured by falling down': 'Notes 16. Person injured by falling down HRL',
  },

    log: {
      '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin LOG',
      '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester LOG',
      '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination LOG',
      '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 LOG',
      '5. D716 Damaged component': 'Notes 5. D716 Damaged component LOG',
      '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix LOG',
      '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors LOG',
      '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 LOG',
      '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures LOG',
      '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report LOG',
      '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings LOG',
      '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO LOG',
      '13. Internal transport damage': 'Notes 13. Internal transport damage LOG',
      '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1LOG',
      '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment LOG',
      '16. Person injured by falling down': 'Notes 16. Person injured by falling down LOG',
    },
  
    fcm: {
      '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin FCM',
      '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester FCM',
      '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination FCM',
      '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 FCM',
      '5. D716 Damaged component': 'Notes 5. D716 Damaged component FCM',
      '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix FCM',
      '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors FCM',
      '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 FCM',
      '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures FCM',
      '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report FCM',
      '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings FCM',
      '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO FCM',
      '13. Internal transport damage': 'Notes 13. Internal transport damage FCM',
      '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1FCM',
      '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment FCM',
      '16. Person injured by falling down': 'Notes 16. Person injured by falling down FCM',
    },
    qmmc: {
      '1. FC 100x higher on QFN 48 pin': 'Notes 1. FC 100x higher on QFN 48 pin FCM',
      '2. FABS2 EOL Tester': 'Notes 2. FABS2 EOL Tester FCM',
      '3. MOE3 Milling Pool - PCB edge delamination': 'Notes 3. MOE3 Milling Pool - PCB edge delamination FCM',
      '4. IvecoMux safety incident with shelfcarriers 1': 'Notes 4. IvecoMux safety incident with shelfcarriers 1 FCM',
      '5. D716 Damaged component': 'Notes 5. D716 Damaged component FCM',
      '6. JLR Ford parts mix': 'Notes 6. JLR Ford parts mix FCM',
      '7. PSS - Laser Marking Machine safety errors': 'Notes 7. PSS - Laser Marking Machine safety errors FCM',
      '8. Deviatie de contur Milling 225': 'Notes 8. Deviatie de contur Milling 225 FCM',
      '9. ECA_M2_Scontrol_Pseudo Failures': 'Notes 9. ECA_M2_Scontrol_Pseudo Failures FCM',
      '10. DASy Enhanced MARVEL eFUse_8D_report': 'Notes 10. DASy Enhanced MARVEL eFUse_8D_report FCM',
      '11. SKD16 VC1CP019 pushed-out bushings': 'Notes 11. SKD16 VC1CP019 pushed-out bushings FCM',
      '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes 12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO FCM',
      '13. Internal transport damage': 'Notes 13. Internal transport damage FCM',
      '14. Damage component –coil L414_1': 'Notes 14. Damage component –coil L414_1FCM',
      '15 Prevention of Retractable Clamp Detachment': 'Notes 15 Prevention of Retractable Clamp Detachment FCM',
      '16. Person injured by falling down': 'Notes 16. Person injured by falling down FCM',
    },
  };

const departmentCriteria = {
  'pm': ["D1 and D2", "Involvement of associates"],
  'pc': ["D1 and D2", "Involvement of associates"],
  'mse': ["D1 and D2", "Involvement of associates"],
  'tef': ["D1 and D2", "Involvement of associates"],
  'qmm': ["D1 and D2", "Involvement of associates"],
  'qmml': ["D1 and D2", "Involvement of associates"],
  'ctg': ["D1 and D2", "Involvement of associates"],
  'hrl': ["D1 and D2", "Involvement of associates"],
  'log': ["D1 and D2", "Involvement of associates"],
  'fcm': ["D1 and D2", "Involvement of associates"],
  'qmmc': ["D1 and D2", "Involvement of associates"],
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
        "D1 and D2": psMethodAverage,
        "Involvement of associates": kpiImprovementAverage,
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
  
    for (let i = 0; i <=15; i++) {
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
                '1. FC 100x higher on QFN 48 pin': resetRatings(),
                '2. FABS2 EOL Tester': resetRatings(),
                '3. MOE3 Milling Pool - PCB edge delamination': resetRatings(),
                '4. IvecoMux safety incident with shelfcarriers 1': resetRatings(),
                '5. D716 Damaged component': resetRatings(),
                '6. JLR Ford parts mix': resetRatings(),
                '7. PSS - Laser Marking Machine safety errors': resetRatings(),
                '8. Deviatie de contur Milling 225': resetRatings(),
                '9. ECA_M2_Scontrol_Pseudo Failures': resetRatings(),
                '10. DASy Enhanced MARVEL eFUse_8D_report': resetRatings(),
                '11. SKD16 VC1CP019 pushed-out bushings': resetRatings(),
                '12. Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': resetRatings(),
                '13. Internal transport damage': resetRatings(),
                '14. Damage component –coil L414_1': resetRatings(),
                '15 Prevention of Retractable Clamp Detachment': resetRatings(),
                '16. Person injured by falling down': resetRatings(),
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
  "D1 and D2": ['category1', 'category2', 'category3', 'category4'],
  "Involvement of associates": ['kpi-improvement-category1', 'kpi-improvement-category2', 'kpi-improvement-category3'],
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
      <h1>PS Awards Digital Booklet 2024</h1>
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
          {selectedDepartment && departmentCriteria[selectedDepartment].includes("D1 and D2") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">
              D1 and D2
              </label>
            </div>
            <label className="text-left">
              1. Is the PS team complete? (rate 0 to 5; 0 - TL only, 5 - Sponsor, TL, PS expert and specialists in the team) 
              <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Is the Sponsor appointed?</li>
                <li>Was a TL nominated?</li>
                <li>Relevant departments and expertise available in the team?</li>
              </ul>
            </label>
            {renderRatings(selectedProject, 'category1', 5)}
            <label className="text-left">
              2. Is the aim/scope of the project defined and the non-conformity clearly described? (In Shainin: Project statement) (rate 0 to 5; 0 - very brief description, 5 - specific problem description complete with pictures, wrong/good example) 
                <ul style={{ listStyleType: 'lower-alpha' }}>
                  <li>What is exactly the non-conformity? Is it described specifically? (bad example: wrong label, good example: field 5 from customer label missing)</li>
                </ul>
            </label>
            {renderRatings(selectedProject, 'category2', 5) }
            <label className="text-left">
              3. Is the fundamental problem clearly described, as a result of the Is/Is not analysis?   
                <ul style={{ listStyleType: 'lower-alpha' }}>
                  <li>In facts collection, are there answers to the following questions: What, Where, When, Who, How much?</li>
                  <li>In Shainin: problem definition with info about what, where, when, who, how much?</li>
                  <li>Are there photos regarding defects available? (good/bad part representation)</li>
                  <li>Graphs (for when again, how much, wherever is applicable) available?</li>
                </ul>
            </label>
            {renderRatings(selectedProject, 'category3', 5)}
            <label className="text-left">
              4. Is D2 problem oriented (Shainin: Is Focus and Approch problem oriented)? 
            </label>
            {renderRatings(selectedProject, 'category4', 5)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("Involvement of associates") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">Involvement of associates</label>
            </div>
            <label className="text-left">
              1. Team and resource management: planning meetings, actions derived from meetings
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category1', 5)}
            <label className="text-left">
              2. Involvement and support of the sponsor in reviews 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category2', 5)}
            <label className="text-left">
              3. Involvement of relevant functions from the affected area 
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
