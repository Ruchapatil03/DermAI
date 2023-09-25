// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract DermAIRevised is Ownable {
    struct HealthcareProfessional {
        uint256 professionalID;
        address payable addr;
        string PFPHash;
        string DetailsHash;
        uint256[] userPatientsInCharge; // Only for Healthcare
    }

    struct Patient {
        uint256 patientID;
        string PFPHash;
        address payable addr;
        string DetailsHash;
        string PrePlatformDiagnosisHash;
        uint256[] PlatformDiagnosis;
    }

    struct Diagnosis {
        uint256 diagnosisID;
        string timestamp;
        string inputDiagnosisImage;
        string inputSymptoms;
        string diagnosis;
    }

    uint256 public numPatients = 0;
    uint256 public numProfessionals = 0;
    uint256 public numDiagnoses = 0;

    mapping(uint256 => Patient) public Patients;
    mapping(uint256 => HealthcareProfessional) public Professionals;
    mapping(uint256 => Diagnosis) public Diagnoses;

    function createPatient(
        string memory _pfp,
        string memory _details,
        string memory _prediag
    ) public {
        numPatients++;
        Patients[numPatients] = Patient({
            patientID: numPatients,
            PFPHash: _pfp,
            DetailsHash: _details,
            PrePlatformDiagnosisHash: _prediag,
            PlatformDiagnosis: new uint256[](0),
            addr:payable (address(msg.sender))
        });
    }

    function createProfessional(
        string memory _pfp,
        string memory _details
    ) public {
        numProfessionals++;
        Professionals[numProfessionals] = HealthcareProfessional({
            professionalID: numProfessionals,
            PFPHash: _pfp,
            DetailsHash: _details,
            userPatientsInCharge: new uint256[](0),
            addr:payable (address(msg.sender))
        });
    }

    function createDiagnosis(
        string memory _timestamp,
        string memory _inputDiagnosisImage,
        string memory _inputSymptoms,
        string memory _diagnosis,
        uint256 patID
    ) public {
        numDiagnoses++;
        Diagnoses[numDiagnoses] = Diagnosis({
            diagnosisID: numDiagnoses,
            timestamp: _timestamp,
            inputDiagnosisImage: _inputDiagnosisImage,
            inputSymptoms: _inputSymptoms,
            diagnosis: _diagnosis
        });
        Patients[patID].PlatformDiagnosis.push(numDiagnoses);
    }

    function getPatientDetails(uint256 patID)
        public
        view
        returns (
            uint256,
            string memory,
            address payable,
            string memory,
            string memory,
            uint256[] memory
        )
    {
        Patient storage patient = Patients[patID];
        return (
            patient.patientID,
            patient.PFPHash,
            patient.addr,
            patient.DetailsHash,
            patient.PrePlatformDiagnosisHash,
            patient.PlatformDiagnosis
        );
    }

    // Retrieve Professional Details by ID
    function getProfessionalDetails(uint256 profID)
        public
        view
        returns (
            uint256,
            address payable,
            string memory,
            string memory,
            uint256[] memory
        )
    {
        HealthcareProfessional storage prof = Professionals[profID];
        return (
            prof.professionalID,
            prof.addr,
            prof.PFPHash,
            prof.DetailsHash,
            prof.userPatientsInCharge
        );
    }

    // Retrieve Diagnosis Details by ID
    function getDiagnosisDetails(uint256 diagID)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Diagnosis storage diag = Diagnoses[diagID];
        return (
            diag.diagnosisID,
            diag.timestamp,
            diag.inputDiagnosisImage,
            diag.inputSymptoms,
            diag.diagnosis
        );
    }

    // Get Count of Patients
    function getCountOfPatients() public view returns (uint256) {
        return numPatients;
    }

    // Get Count of Professionals
    function getCountOfProfessionals() public view returns (uint256) {
        return numProfessionals;
    }

    // Get Count of Diagnoses
    function getCountOfDiagnoses() public view returns (uint256) {
        return numDiagnoses;
    }
}
