function toggleMenu() { document.getElementById("sidebar").classList.toggle("active"); }

    const appointments = [
      { date: "01 Aug 2025", doctor: "Dr. Smith", department: "Physiotherapy", status: "Completed" },
      { date: "02 Aug 2025", doctor: "Dr. Allen", department: "Orthopedic", status: "Completed" },
      { date: "03 Aug 2025", doctor: "Dr. Johnson", department: "General Medicine", status: "Completed" },
      { date: "04 Aug 2025", doctor: "Dr. Patel", department: "Cardiology", status: "Completed" },
      { date: "05 Aug 2025", doctor: "Dr. Kim", department: "Neurology", status: "Completed" },
      { date: "06 Aug 2025", doctor: "Dr. Lee", department: "Dermatology", status: "Completed" },
      { date: "07 Aug 2025", doctor: "Dr. Brown", department: "ENT", status: "Completed" },
      { date: "08 Aug 2025", doctor: "Dr. Miller", department: "Pediatrics", status: "Completed" },
      { date: "09 Aug 2025", doctor: "Dr. Wilson", department: "Orthopedic", status: "Completed" },
      { date: "10 Aug 2025", doctor: "Dr. Taylor", department: "General Medicine", status: "Completed" },
      { date: "11 Aug 2025", doctor: "Dr. Clark", department: "Physiotherapy", status: "Upcoming" },
      { date: "12 Aug 2025", doctor: "Dr. Adams", department: "Orthopedic", status: "Upcoming" }
    ];

    function renderTable() {
      const tableBody = document.getElementById("appointment-table");
      tableBody.innerHTML = ""; // clear previous rows
      appointments.forEach(app => {
        const row = `<tr>
          <td>${app.date}</td>
          <td>${app.doctor}</td>
          <td>${app.department}</td>
          <td>${app.status}</td>
        </tr>`;
        tableBody.innerHTML += row;
      });
      // Reset scroll to top
      document.querySelector('.scrollable-table').scrollTop = 0;
    }

    // Ensure table renders when coming back from another page
    window.addEventListener('pageshow', renderTable);