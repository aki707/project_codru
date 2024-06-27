import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const mappedData = data.map((user, index) => ({
          id: index,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
          photo: user.photo,
        }));

        setUsers(mappedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id, username, role) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the user "${username}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/user/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAssignTask = (username) => {
    navigate(`/add-task/${username}`);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    // {
    //   field: "photo",
    //   headerName: "Photo",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div className="admin-user-photo-container">
    //       <img
    //         src={params.value}
    //         className="admin-user-photo"
    //         alt="User Photo"
    //       />
    //     </div>
    //   ),
    // },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="actions-container">
          {params.row.role === "Student" && (
            <button
              onClick={() => handleAssignTask(params.row.username)}
              className="assign-task-button"
            >
              <AssignmentIcon fontSize="medium" />
            </button>
          )}
          <button
            onClick={() =>
              handleDelete(params.row.id, params.row.username, params.row.role)
            }
            className="delete-button"
          >
            <DeleteIcon fontSize="medium" />
          </button>
        </div>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbar />
        <GridToolbarQuickFilter style={{ width: "30%" }} />
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 2,
        }}
        rows={users}
        columns={columns}
        pageSize={5}
        loading={loading}
        slots={{
          toolbar: CustomToolbar,
        }}
        ignoreDiacritics
      />
    </div>
  );
}
