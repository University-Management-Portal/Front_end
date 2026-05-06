import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Button, TextField, CircularProgress, Alert, Snackbar, Tab, Tabs, Box, IconButton, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as XLSX from 'xlsx';

const departmentSections = {
    CSE: ["A", "B", "C"],
    IT: ["A", "B"],
    EEE: ["A", "B"],
    ECE: ["A", "B", "C"],
    CD: ["A"],
    CT: ["A"],
    CYBER: ["A"],
    CIVIL: ["A"],
    MECH: ["A"],
    ETE: ["A"],
    AIDS: ["A", "B"],
    AE: ["A"],
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other} className="bg-white p-6 rounded-b-[10px] shadow-md border border-gray-200 border-t-0">
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default function AdminResult() {
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: 'info', open: false });

    // Publish State
    const [pubYear, setPubYear] = useState('');
    const [pubSem, setPubSem] = useState('');

    // Individual Entry Form State
    const [formData, setFormData] = useState({
        registerNo: '', dob: '', studentName: '', department: '',
        semester: '', academicYear: '', sgpa: '', cgpa: '', totalCredits: '', resultStatus: ''
    });
    const [details, setDetails] = useState([
        { semester: '', courseCode: '', courseTitle: '', credits: '', gradePoint: '', letterGrade: '' }
    ]);

    // Excel State
    const [excelFile, setExcelFile] = useState(null);

    // Exam Schedules State
    const [schedules, setSchedules] = useState([]);
    const [schedFile, setSchedFile] = useState(null);
    const [schedForm, setSchedForm] = useState({ title: '', department: '', year: '', academicYear: '' });
    const [activeYear, setActiveYear] = useState(new Date().getFullYear()); // for fetching schedules

    // Fee Structure State
    const [feeStructures, setFeeStructures] = useState([]);
    const [feeForm, setFeeForm] = useState({ feeType: 'REGULAR', department: '', semester: '', academicYear: '', amount: '', dueDate: '', finePerDay: '' });

    // Arrear Fees State
    const [arrearForm, setArrearForm] = useState({
        registerNo: '', semester: '', academicYear: '', amount: '', dueDate: '', finePerDay: '0', arrearCount: 1
    });

    useEffect(() => {
        fetchSchedules(activeYear);
        fetchFeeStructures();
    }, [activeYear]);

    const fetchSchedules = async (y) => {
        try {
            const res = await axiosInstance.get(`/assessment/exams/schedules/year/${y}`);
            setSchedules(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchFeeStructures = async () => {
        try {
            const res = await axiosInstance.get('/assessment/fee-structure');
            setFeeStructures(res.data);
        } catch (err) { console.error(err); }
    };

    const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDetailChange = (index, e) => {
        const newDetails = [...details];
        newDetails[index][e.target.name] = e.target.value;
        setDetails(newDetails);
    };

    const addDetailRow = () => {
        setDetails([...details, { semester: formData.semester || '', courseCode: '', courseTitle: '', credits: '', gradePoint: '', letterGrade: '' }]);
    };

    const removeDetailRow = (index) => {
        const newDetails = [...details];
        newDetails.splice(index, 1);
        setDetails(newDetails);
    };

    const handleIndividualSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                registerNo: formData.registerNo,
                dob: formData.dob,
                studentName: formData.studentName,
                department: formData.department,
                semester: parseInt(formData.semester),
                academicYear: formData.academicYear,
                sgpa: parseFloat(formData.sgpa),
                cgpa: parseFloat(formData.cgpa),
                totalCredits: parseInt(formData.totalCredits),
                resultStatus: formData.resultStatus,
                details: details.map(d => ({
                    ...d,
                    semester: parseInt(d.semester),
                    credits: parseInt(d.credits),
                    gradePoint: parseFloat(d.gradePoint)
                }))
            };
            await axiosInstance.post('/assessment/results', payload);
            setMessage({ text: 'Individual Result Added Successfully', type: 'success', open: true });
            setFormData({ registerNo: '', dob: '', studentName: '', department: '', semester: '', academicYear: '', sgpa: '', cgpa: '', totalCredits: '', resultStatus: '' });
            setDetails([{ semester: '', courseCode: '', courseTitle: '', credits: '', gradePoint: '', letterGrade: '' }]);
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Failed to add individual result. Check credentials and format.', type: 'error', open: true });
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        setExcelFile(e.target.files[0]);
    };

    const handleExcelSubmit = async (e) => {
        e.preventDefault();
        if (!excelFile) {
            setMessage({ text: 'Please select an Excel file.', type: 'warning', open: true });
            return;
        }

        setLoading(true);
        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(ws);

                let groupedResults = [];
                let currentResult = null;

                for (let row of data) {
                    // Start a new student if registerNo is present
                    if (row.registerNo) {
                        currentResult = {
                            registerNo: row.registerNo ? String(row.registerNo) : null,
                            dob: row.dob ? String(row.dob) : null,
                            studentName: row.studentName || '',
                            department: row.department || '',
                            semester: row.semester ? parseInt(row.semester) : null,
                            academicYear: row.academicYear || '',
                            sgpa: row.sgpa !== undefined ? parseFloat(row.sgpa) : null,
                            cgpa: row.cgpa !== undefined ? parseFloat(row.cgpa) : null,
                            totalCredits: row.totalCredits !== undefined ? parseInt(row.totalCredits) : null,
                            resultStatus: row.resultStatus || '',
                            details: []
                        };
                        groupedResults.push(currentResult);
                    }

                    // For every row (including the first one), extract the course info if present
                    if (currentResult && row.courseCode) {
                        currentResult.details.push({
                            semester: row.courseSemester ? parseInt(row.courseSemester) : currentResult.semester,
                            courseCode: String(row.courseCode),
                            courseTitle: row.courseTitle || '',
                            credits: row.credits !== undefined ? parseInt(row.credits) : 0,
                            gradePoint: row.gradePoint !== undefined ? parseFloat(row.gradePoint) : 0.0,
                            letterGrade: row.letterGrade || ''
                        });
                    }
                }

                let successCount = 0;
                for (let payload of groupedResults) {
                    await axiosInstance.post('/assessment/results', payload);
                    successCount++;
                }

                setMessage({ text: `Successfully imported ${successCount} student results from Excel.`, type: 'success', open: true });
                setExcelFile(null);
            } catch (error) {
                console.error('Excel parse error:', error);
                setMessage({ text: 'Failed to process Excel file. Please ensure column headers match exact backend DTO names.', type: 'error', open: true });
            } finally {
                setLoading(false);
            }
        };
        reader.readAsBinaryString(excelFile);
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!pubYear || !pubSem) {
            setMessage({ text: 'Academic Year and Semester are required.', type: 'warning', open: true });
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.put(`/assessment/results/publish?academicYear=${pubYear}&semester=${pubSem}`);
            setMessage({ text: `Results for ${pubYear} (Sem ${pubSem}) Published Successfully!`, type: 'success', open: true });
            setPubYear('');
            setPubSem('');
        } catch (error) {
            setMessage({ text: 'Failed to publish results.', type: 'error', open: true });
        } finally {
            setLoading(false);
        }
    };

    const downloadExcelTemplate = () => {
        const templateData = [
            {
                registerNo: 'REG001',
                dob: '2002-05-15',
                studentName: 'John Doe',
                department: 'CSE',
                semester: 1,
                academicYear: '2024-2025',
                sgpa: 8.5,
                cgpa: 8.5,
                totalCredits: 22,
                resultStatus: 'PASS',
                courseSemester: 1,
                courseCode: 'CS101',
                courseTitle: 'Programming',
                credits: 4,
                gradePoint: 9.0,
                letterGrade: 'O'
            },
            {
                registerNo: '',
                dob: '',
                studentName: '',
                department: '',
                semester: '',
                academicYear: '',
                sgpa: '',
                cgpa: '',
                totalCredits: '',
                resultStatus: '',
                courseSemester: 1,
                courseCode: 'CS102',
                courseTitle: 'Data Structures',
                credits: 4,
                gradePoint: 8.0,
                letterGrade: 'A+'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "ResultTemplate");
        XLSX.writeFile(wb, "Result_Upload_Template.xlsx");
    };

    const handleSchedSubmit = async (e) => {
        e.preventDefault();
        if (!schedFile || !schedForm.title || !schedForm.department || !schedForm.year || !schedForm.academicYear) {
            setMessage({ text: 'All schedule fields and file are required.', type: 'warning', open: true });
            return;
        }
        setLoading(true);
        const fd = new FormData();
        fd.append('file', schedFile);
        fd.append('scheduleStr', JSON.stringify(schedForm));
        try {
            await axiosInstance.post('/assessment/exams/schedules', fd);
            setMessage({ text: 'Schedule Uploaded Successfully!', type: 'success', open: true });
            setSchedForm({ title: '', department: '', year: '', academicYear: '' });
            setSchedFile(null);
            fetchSchedules(activeYear);
        } catch (error) {
            setMessage({ text: 'Failed to upload schedule.', type: 'error', open: true });
        } finally { setLoading(false); }
    };

    const handleSchedDelete = async (id) => {
        if (!window.confirm('Delete this schedule?')) return;
        try {
            await axiosInstance.delete(`/assessment/exams/schedules/${id}`);
            setMessage({ text: 'Schedule Deleted', type: 'success', open: true });
            fetchSchedules(activeYear);
        } catch (error) {
            setMessage({ text: 'Delete failed.', type: 'error', open: true });
        }
    };

    const handleFeeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/assessment/fee-structure', {
                ...feeForm,
                amount: parseFloat(feeForm.amount),
                finePerDay: feeForm.finePerDay ? parseFloat(feeForm.finePerDay) : 0,
                semester: parseInt(feeForm.semester),
                category: feeForm.feeType // Category == REGULAR / ARREAR
            });
            setMessage({ text: 'Fee Structure Saved and Applicable Fees Generated!', type: 'success', open: true });
            setFeeForm({ feeType: 'REGULAR', department: '', semester: '', academicYear: '', amount: '', dueDate: '', finePerDay: '' });
            fetchFeeStructures();
        } catch (error) {
            setMessage({ text: 'Failed to save Fee Structure.', type: 'error', open: true });
        } finally { setLoading(false); }
    };

    const handleFeeDelete = async (id) => {
        if (!window.confirm('Delete this Fee Structure?')) return;
        try {
            await axiosInstance.delete(`/assessment/fee-structure/${id}`);
            setMessage({ text: 'Structure Deleted', type: 'success', open: true });
            fetchFeeStructures();
        } catch (error) {
            setMessage({ text: 'Delete failed.', type: 'error', open: true });
        }
    };

    const handleArrearSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...arrearForm,
                registerNo: String(arrearForm.registerNo), // Changed to registerNo
                semester: parseInt(arrearForm.semester),
                amount: parseFloat(arrearForm.amount),
                arrearCount: parseInt(arrearForm.arrearCount),
                finePerDay: parseFloat(arrearForm.finePerDay),
                feeType: 'ARREAR'
            };
            await axiosInstance.post('/assessment/exam-fees', payload);
            setMessage({ open: true, text: "Arrear Fee Issued Successfully!", type: "success" });
            setArrearForm({ registerNo: '', semester: '', academicYear: '', amount: '', dueDate: '', finePerDay: '0', arrearCount: 1 });
        } catch (error) {
            console.error(error);
            setMessage({ open: true, text: "Failed to issue arrear fee", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[1500px] p-6">
            <h1 className="text-[30px] font-bold text-[#16005D] mb-6">Results Administration</h1>

            <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} indicatorColor="primary" textColor="primary" className="bg-gray-100 rounded-t-[10px]" variant="scrollable" scrollButtons="auto">
                <Tab label="Individual Entry" />
                <Tab label="Excel Upload" />
                <Tab label="Publish Results" />
                <Tab label="Exam Schedules" />
                <Tab label="Fee Structures" />
                <Tab label="Arrear Fees" />
            </Tabs>

            {/* Individual Entry Tab */}
            <TabPanel value={tabIndex} index={0}>
                <form onSubmit={handleIndividualSubmit}>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Assign Main Result Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <TextField required label="Register No" name="registerNo" value={formData.registerNo} onChange={handleFormChange} size="small" placeholder="REG001" />
                        <TextField required label="Date of Birth (YYYY-MM-DD)" name="dob" value={formData.dob} onChange={handleFormChange} size="small" placeholder="2002-05-15" />
                        <TextField required label="Student Name" name="studentName" value={formData.studentName} onChange={handleFormChange} size="small" />

                        <FormControl size="small" required>
                            <InputLabel>Department</InputLabel>
                            <Select name="department" label="Department" value={formData.department} onChange={handleFormChange}>
                                <MenuItem value="ALL">ALL</MenuItem>
                                {Object.keys(departmentSections).map(d => (
                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Semester</InputLabel>
                            <Select name="semester" label="Semester" value={formData.semester} onChange={handleFormChange}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Academic Year</InputLabel>
                            <Select name="academicYear" label="Academic Year" value={formData.academicYear} onChange={handleFormChange}>
                                <MenuItem value="2023-2024">2023 - 2024</MenuItem>
                                <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                                <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                                <MenuItem value="2026-2027">2026 - 2027</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField required label="SGPA" type="number" step="0.01" name="sgpa" value={formData.sgpa} onChange={handleFormChange} size="small" />
                        <TextField required label="CGPA" type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleFormChange} size="small" />
                        <TextField required label="Total Credits" type="number" name="totalCredits" value={formData.totalCredits} onChange={handleFormChange} size="small" />

                        <FormControl size="small" required>
                            <InputLabel>Result Status</InputLabel>
                            <Select name="resultStatus" label="Result Status" value={formData.resultStatus} onChange={handleFormChange}>
                                <MenuItem value="PASS">PASS</MenuItem>
                                <MenuItem value="FAIL">FAIL</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Divider className="my-6" />

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Course Level Allocations (Credits & Grades)</h2>
                        <Button startIcon={<AddCircleOutlineIcon />} onClick={addDetailRow} variant="outlined" size="small">Add Course</Button>
                    </div>

                    {details.map((detail, index) => (
                        <div key={index} className="flex gap-2 items-center mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                            <TextField required label="Sem" name="semester" value={detail.semester} onChange={(e) => handleDetailChange(index, e)} size="small" className="w-16" />
                            <TextField required label="Course Code" name="courseCode" value={detail.courseCode} onChange={(e) => handleDetailChange(index, e)} size="small" className="flex-1" />
                            <TextField required label="Course Title" name="courseTitle" value={detail.courseTitle} onChange={(e) => handleDetailChange(index, e)} size="small" className="flex-1" />
                            <TextField required label="Credits" type="number" name="credits" value={detail.credits} onChange={(e) => handleDetailChange(index, e)} size="small" className="w-20" />
                            <TextField required label="Point" type="number" step="0.1" name="gradePoint" value={detail.gradePoint} onChange={(e) => handleDetailChange(index, e)} size="small" className="w-20" />
                            <TextField required label="Grade" name="letterGrade" value={detail.letterGrade} onChange={(e) => handleDetailChange(index, e)} size="small" className="w-24" placeholder="O, A+, B" />
                            <IconButton color="error" onClick={() => removeDetailRow(index)} disabled={details.length === 1}><DeleteIcon /></IconButton>
                        </div>
                    ))}

                    <Button type="submit" variant="contained" disabled={loading} sx={{ backgroundColor: '#16005D', mt: 4, width: '200px' }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Individual'}
                    </Button>
                </form>
            </TabPanel>

            {/* Excel Upload Tab */}
            <TabPanel value={tabIndex} index={1}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Bulk Upload via Excel</h2>
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 max-w-3xl gap-4">
                    <p className="text-sm text-gray-600">
                        Upload your `.xlsx` result data. Group multiple courses for the same student by leaving the student details blank on subsequent rows. Download the template for a quick example!
                    </p>
                    <Button variant="contained" onClick={downloadExcelTemplate} sx={{ minWidth: '180px', backgroundColor: '#16005D', color: 'white', border: '1px solid #16005D', '&:hover': { backgroundColor: 'transparent', color: '#16005D', borderColor: '#16005D' } }}>
                        Download Template
                    </Button>
                </div>
                <form onSubmit={handleExcelSubmit} className="max-w-md">
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#16005D] file:text-white hover:file:bg-[#2c00a6] cursor-pointer mb-6" />

                    <Button type="submit" variant="contained" disabled={loading || !excelFile} sx={{ backgroundColor: '#16005D', width: '200px' }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Excel'}
                    </Button>
                </form>
            </TabPanel>

            {/* Publish Results Tab */}
            <TabPanel value={tabIndex} index={2}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Publish to Student Portal</h2>
                <p className="text-sm text-gray-600 mb-6">Entering the Academic Year and Semester will make all currently un-published results for that term visible to students.</p>
                <form onSubmit={handlePublish} className="max-w-md">

                    <FormControl fullWidth size="small" required sx={{ mb: 3 }}>
                        <InputLabel>Academic Year</InputLabel>
                        <Select label="Academic Year" value={pubYear} onChange={(e) => setPubYear(e.target.value)}>
                            <MenuItem value="2023-2024">2023 - 2024</MenuItem>
                            <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                            <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                            <MenuItem value="2026-2027">2026 - 2027</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size="small" required sx={{ mb: 4 }}>
                        <InputLabel>Semester</InputLabel>
                        <Select label="Semester" value={pubSem} onChange={(e) => setPubSem(e.target.value)}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="success" disabled={loading || !pubYear || !pubSem} sx={{ width: '200px' }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Publish Results'}
                    </Button>
                </form>
            </TabPanel>

            {/* Exam Schedules Tab */}
            <TabPanel value={tabIndex} index={3}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Exam Schedules</h2>
                <form onSubmit={handleSchedSubmit} className="max-w-4xl mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <TextField required label="Title" value={schedForm.title} onChange={(e) => setSchedForm({ ...schedForm, title: e.target.value })} size="small" />

                        <FormControl size="small" required>
                            <InputLabel>Department</InputLabel>
                            <Select label="Department" value={schedForm.department} onChange={(e) => setSchedForm({ ...schedForm, department: e.target.value })}>
                                <MenuItem value="ALL">ALL</MenuItem>
                                {Object.keys(departmentSections).map(d => (
                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Target Year</InputLabel>
                            <Select label="Target Year" value={schedForm.year} onChange={(e) => setSchedForm({ ...schedForm, year: e.target.value })}>
                                {[1, 2, 3, 4].map(y => (
                                    <MenuItem key={y} value={y}>{y}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Academic Year</InputLabel>
                            <Select label="Academic Year" value={schedForm.academicYear} onChange={(e) => setSchedForm({ ...schedForm, academicYear: e.target.value })}>
                                <MenuItem value="2023-2024">2023 - 2024</MenuItem>
                                <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                                <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                                <MenuItem value="2026-2027">2026 - 2027</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <input type="file" required accept="image/*" onChange={(e) => setSchedFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#16005D] file:text-white hover:file:bg-[#2c00a6] cursor-pointer mb-4" />
                    <Button type="submit" variant="contained" disabled={loading} sx={{ backgroundColor: '#16005D' }}>Upload Schedule</Button>
                </form>

                <h3 className="text-lg font-bold mb-2">Existing Schedules (Year {activeYear})</h3>
                <TextField label="Filter by Year" type="number" value={activeYear} onChange={(e) => setActiveYear(e.target.value)} size="small" sx={{ mb: 2 }} />
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead className="bg-gray-200">
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Acad Year</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedules.map(s => (
                                <TableRow key={s.id}>
                                    <TableCell>{s.id}</TableCell>
                                    <TableCell>{s.title}</TableCell>
                                    <TableCell>{s.department}</TableCell>
                                    <TableCell>{s.academicYear}</TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleSchedDelete(s.id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            {/* Fee Structures Tab */}
            <TabPanel value={tabIndex} index={4}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Base Fee Structures</h2>
                <form onSubmit={handleFeeSubmit} className="max-w-4xl mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <FormControl size="small" required>
                            <InputLabel>Fee Type</InputLabel>
                            <Select label="Fee Type" value={feeForm.feeType} onChange={(e) => setFeeForm({ ...feeForm, feeType: e.target.value })}>
                                <MenuItem value="REGULAR">Regular Base Fee</MenuItem>
                                <MenuItem value="ARREAR">Arrear Base Component</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Department</InputLabel>
                            <Select label="Department" value={feeForm.department} onChange={(e) => setFeeForm({ ...feeForm, department: e.target.value })}>
                                <MenuItem value="ALL">ALL</MenuItem>
                                {Object.keys(departmentSections).map(d => (
                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Semester</InputLabel>
                            <Select label="Semester" value={feeForm.semester} onChange={(e) => setFeeForm({ ...feeForm, semester: e.target.value })}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Academic Year</InputLabel>
                            <Select label="Academic Year" value={feeForm.academicYear} onChange={(e) => setFeeForm({ ...feeForm, academicYear: e.target.value })}>
                                <MenuItem value="2023-2024">2023 - 2024</MenuItem>
                                <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                                <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                                <MenuItem value="2026-2027">2026 - 2027</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField required label="Amount (₹)" type="number" value={feeForm.amount} onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })} size="small" />
                        <TextField required label="Due Date" type="date" InputLabelProps={{ shrink: true }} value={feeForm.dueDate} onChange={(e) => setFeeForm({ ...feeForm, dueDate: e.target.value })} size="small" />
                        <TextField label="Fine Per Day (₹)" type="number" value={feeForm.finePerDay} onChange={(e) => setFeeForm({ ...feeForm, finePerDay: e.target.value })} size="small" />
                    </div>
                    <Button type="submit" variant="contained" disabled={loading} sx={{ backgroundColor: '#16005D' }}>Save Fee Structure</Button>
                </form>

                <h3 className="text-lg font-bold mb-2">Existing Fee Structures</h3>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead className="bg-gray-200">
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Dept</TableCell>
                                <TableCell>Sem</TableCell>
                                <TableCell>Acad Year</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feeStructures.map((fee) => (
                                <TableRow key={fee.id} hover className="transition">
                                    <TableCell className="font-semibold">{fee.category}</TableCell>
                                    <TableCell>{fee.department ? fee.department : 'ALL'}</TableCell>
                                    <TableCell>{fee.semester || '-'}</TableCell>
                                    <TableCell>{fee.academicYear}</TableCell>
                                    <TableCell>₹{fee.amount}</TableCell>
                                    <TableCell>{fee.dueDate}</TableCell>
                                    <TableCell>
                                        <button onClick={() => handleFeeDelete(fee.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            {/* Arrear Fees Tab */}
            <TabPanel value={tabIndex} index={5}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Issue Arrear Exam Fees (Individual)</h2>
                <form onSubmit={handleArrearSubmit} className="max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <TextField required label="Register No" value={arrearForm.registerNo} onChange={(e) => setArrearForm({ ...arrearForm, registerNo: e.target.value })} size="small" placeholder="REG001" />

                        <FormControl size="small" required>
                            <InputLabel>Semester</InputLabel>
                            <Select label="Semester" value={arrearForm.semester} onChange={(e) => setArrearForm({ ...arrearForm, semester: e.target.value })}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" required>
                            <InputLabel>Academic Year</InputLabel>
                            <Select label="Academic Year" value={arrearForm.academicYear} onChange={(e) => setArrearForm({ ...arrearForm, academicYear: e.target.value })}>
                                <MenuItem value="2023-2024">2023 - 2024</MenuItem>
                                <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                                <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                                <MenuItem value="2026-2027">2026 - 2027</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField required label="Arrear Subjects Count" type="number" value={arrearForm.arrearCount} onChange={(e) => setArrearForm({ ...arrearForm, arrearCount: e.target.value })} size="small" />
                        <TextField required label="Total Amount (₹)" type="number" value={arrearForm.amount} onChange={(e) => setArrearForm({ ...arrearForm, amount: e.target.value })} size="small" />
                        <TextField required label="Due Date" type="date" InputLabelProps={{ shrink: true }} value={arrearForm.dueDate} onChange={(e) => setArrearForm({ ...arrearForm, dueDate: e.target.value })} size="small" />
                        <TextField label="Fine Per Day (₹)" type="number" value={arrearForm.finePerDay} onChange={(e) => setArrearForm({ ...arrearForm, finePerDay: e.target.value })} size="small" />
                    </div>
                    <Button type="submit" variant="contained" disabled={loading} color="error" sx={{ width: '200px' }}>Issue Arrear</Button>
                </form>
            </TabPanel>

            <Snackbar open={message.open} autoHideDuration={6000} onClose={() => setMessage({ ...message, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.type} sx={{ width: '100%' }}>{message.text}</Alert>
            </Snackbar>
        </div>
    );
}
