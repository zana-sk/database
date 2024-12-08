// app.js
let employees = [];

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع ارسال النموذج لتجنب إعادة تحميل الصفحة

    // الحصول على القيم من النموذج
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;

    // إنشاء كائن موظف جديد
    const employee = {
        name,
        age,
        position,
        department
    };

    // إضافة الموظف إلى المصفوفة
    employees.push(employee);

    // إعادة تعيين قيم النموذج بعد الإضافة
    document.getElementById('employeeForm').reset();

    // تحديث عرض الموظفين
    displayEmployees();
});

function displayEmployees() {
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    employeeTable.innerHTML = ''; // مسح المحتوى الحالي

    // إضافة الموظفين الجدد إلى الجدول
    employees.forEach(function(employee) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
        `;
        employeeTable.appendChild(row);
    });
}
// app.js
function uploadExcelData() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('من فضلك اختر ملف Excel أولاً');
        return;
    }

    // قراءة البيانات من ملف Excel
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // قراءة الورقة الأولى من الملف
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // تحويل البيانات إلى JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // إرسال البيانات إلى الخادم
        sendDataToServer(jsonData);
    };

    reader.readAsBinaryString(file);
}

function sendDataToServer(data) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = 'جارٍ تحميل البيانات...';

    // إرسال البيانات عبر API إلى الخادم
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data })
    })
    .then(response => response.json())
    .then(result => {
        statusMessage.textContent = 'تم تحميل البيانات بنجاح!';
    })
    .catch(error => {
        statusMessage.textContent = 'حدث خطأ أثناء تحميل البيانات.';
        console.error('Error:', error);
    });
}
// app.js
let employees = [];

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إرسال النموذج لتجنب إعادة تحميل الصفحة

    // الحصول على القيم من النموذج
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;

    // إنشاء كائن موظف جديد
    const employee = {
        name,
        age,
        position,
        department
    };

    // إضافة الموظف إلى المصفوفة
    employees.push(employee);

    // إعادة تعيين قيم النموذج بعد الإضافة
    document.getElementById('employeeForm').reset();

    // تحديث عرض الموظفين
    displayEmployees();
});

function displayEmployees() {
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    employeeTable.innerHTML = ''; // مسح المحتوى الحالي

    // إضافة الموظفين الجدد إلى الجدول
    employees.forEach(function(employee) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
        `;
        employeeTable.appendChild(row);
    });
}
