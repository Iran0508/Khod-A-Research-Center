document.addEventListener("DOMContentLoaded", function () {
    // Set the current year in the footer
    document.getElementById("yearFooter").textContent = new Date().getFullYear();

    // Populate year dropdown
    let yearSelect = document.getElementById("year");
    for (let year = 2025; year <= 2075; year++) {
        let option = new Option(year, year);
        yearSelect.appendChild(option);
    }

    // Populate month dropdown
    let monthSelect = document.getElementById("month");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    months.forEach((month, index) => {
        let option = new Option(month, index);
        monthSelect.appendChild(option);
    });

    // Populate day dropdown
    let daySelect = document.getElementById("day");
    for (let i = 1; i <= 31; i++) {
        let option = new Option(i, i);
        daySelect.appendChild(option);
    }

    // Contact form validation
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        let email = document.getElementById('email').value;

        if (!email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        document.getElementById('successMessage').style.display = 'block';
    });

    // Calendar functionality
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthAndYear = document.getElementById("monthAndYear");
    const calendarBody = document.getElementById("calendar-body");

    function showCalendar(month, year) {
        calendarBody.innerHTML = ""; // Clear previous cells
        monthAndYear.textContent = `${months[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            let emptyRow = true;

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.textContent = "";
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.textContent = date;
                    date++;
                    emptyRow = false;
                }
                row.appendChild(cell);
            }

            if (!emptyRow) {
                calendarBody.appendChild(row);
            }
        }
    }

    function previous() {
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
        showCalendar(currentMonth, currentYear);
    }

    function next() {
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
        showCalendar(currentMonth, currentYear);
    }

    // Initial call to display the calendar
    showCalendar(currentMonth, currentYear);

    
});