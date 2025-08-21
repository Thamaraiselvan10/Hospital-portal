 const allAppointments = [
      { id: 1, patient: "Sasi Kumar", date: "2025-08-25", time: "10:30 AM", status: "Upcoming", description: "Patient is experiencing anxiety and stress due to work pressure. Needs coping strategies." },
      { id: 2, patient: "Tharan Balaji", date: "2025-08-25", time: "02:00 PM", status: "Upcoming", description: "First session for discussing family-related issues and communication problems." },
      { id: 3, patient: "Vignesh Raj", date: "2025-08-26", time: "11:00 AM", status: "Upcoming", description: "Follow-up on anger management techniques discussed in the previous session." },
      { id: 4, patient: "Sabari Nathan", date: "2025-08-22", time: "03:00 PM", status: "Completed", description: "Patient reported significant improvement in sleep patterns after applying mindfulness exercises." },
      { id: 5, patient: "Rohit Sharma", date: "2025-08-20", time: "09:00 AM", status: "Completed", description: "Final session. Patient has met therapy goals and is being discharged from regular sessions." },
    ];
    
    const reports = [
      { id: 101, patient: "Velumani", date: "2025-08-18", time: "N/A", status: "Completed", description: "This is a summary report for Velumani's completed therapy course." },
      { id: 102, patient: "Anbu Selvan", date: "2025-08-15", time: "N/A", status: "Completed", description: "Initial assessment report for Anbu Selvan." },
    ];
    
    let openDetailsId = null;

    document.addEventListener("DOMContentLoaded", () => {
      updateDashboard(document.querySelector('aside ul li a'));
    });

    const getUpcoming = () => allAppointments.filter(a => a.status === 'Upcoming');
    const getPrevious = () => allAppointments.filter(a => a.status === 'Completed');

    function updateDashboard(linkElement) {
      setActiveLink(linkElement);
      document.getElementById("dashboardTitle").innerText = "Welcome, Dr. Smith!";
      document.getElementById("upcomingCount").innerText = getUpcoming().length;
      document.getElementById("previousCount").innerText = getPrevious().length;
      document.getElementById("reportsCount").innerText = reports.length;
      renderTable(allAppointments, "Recent Appointments", "all");
    }

    function printUpcomingAppointments(linkElement) {
      setActiveLink(linkElement);
      renderTable(getUpcoming(), "Upcoming Appointments", "upcoming");
    }

    function printPreviousAppointments(linkElement) {
      setActiveLink(linkElement);
      renderTable(getPrevious(), "Previous Appointments", "previous");
    }

    function printReports(linkElement) {
      setActiveLink(linkElement);
      renderTable(reports, "Patient Reports", "reports");
    }
    
    function setActiveLink(linkElement) {
        document.querySelectorAll('aside ul li').forEach(li => li.classList.remove('active'));
        if(linkElement) {
            linkElement.parentElement.classList.add('active');
        }
    }

    function renderTable(data, title, type) {
      document.getElementById("tableTitle").innerText = title;
      const tableBody = document.getElementById("appointmentsTable");
      tableBody.innerHTML = "";
      openDetailsId = null;

      if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px;">No records found.</td></tr>`;
        return;
      }

      data.forEach(item => {
        const statusClass = item.status === 'Upcoming' ? 'status-upcoming' : 'status-completed';
        
        let actionsHtml;
        if (type === 'upcoming') {
            actionsHtml = `<button class="btn-action">Start Session</button>`;
        } else if (type === 'reports') {
            actionsHtml = `<button class="btn-action" onclick="toggleDetails(${item.id})">View Report</button>`;
        } else {
            actionsHtml = `<button class="btn-action" onclick="toggleDetails(${item.id})">View Details</button>`;
        }
        
        const mainRowHtml = `
          <tr id="row-${item.id}">
            <td>${item.patient}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>${actionsHtml}</td>
          </tr>`;
          
        const detailsRowHtml = `
          <tr class="details-row" id="details-${item.id}" style="display: none;">
            <td colspan="5" class="details-content">
              <strong>${type === 'reports' ? 'Report Summary:' : 'Reason for Visit:'}</strong>
              <p>${item.description || 'No description provided.'}</p>
            </td>
          </tr>`;

        tableBody.innerHTML += mainRowHtml + detailsRowHtml;
      });
    }

    function toggleDetails(appointmentId) {
      const detailsRow = document.getElementById(`details-${appointmentId}`);
      
      if (openDetailsId && openDetailsId !== appointmentId) {
        const currentlyOpenRow = document.getElementById(`details-${openDetailsId}`);
        if (currentlyOpenRow) currentlyOpenRow.style.display = 'none';
      }

      if (detailsRow.style.display === 'none') {
        detailsRow.style.display = 'table-row';
        openDetailsId = appointmentId;
      } else {
        detailsRow.style.display = 'none';
        openDetailsId = null;
      }
    }

    function toggleMenu() {
      document.getElementById("sidebar").classList.toggle("active");
    }