import React, { useEffect, useState } from 'react';
import { POST, DELETE, allEmployees, GET } from '../services/api';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await GET();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const openAddModal = () => {
    reset(); // Limpiar el formulario al abrir el modal
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeEditModal = () => {
    setSelectedEmployee(null);
  };

  const openDeleteModal = (employee) => {
    if (employee.supervisor) {
      alert("Cannot delete a supervisor.");
    } else {
      setSelectedEmployee(employee);
    }
  };

  const closeDeleteModal = () => {
    setSelectedEmployee(null);
  };

  const onSubmit = async (data) => {
    try {
      if (selectedEmployee) {
        // Si hay un empleado seleccionado, es una edición
        await PUT(selectedEmployee.id, data);
      } else {
        // Si no hay empleado seleccionado, es una adición
        await POST(data);
      }
      // Actualizar la lista de empleados después de agregar/editar
      fetchEmployees();
      closeAddModal();
      closeEditModal();
    } catch (error) {
      console.error('Error adding/editing employee:', error);
    }
  };

  const onDelete = async () => {
    try {
      await DELETE(selectedEmployee.id);
      // Actualizar la lista de empleados después de eliminar
      fetchEmployees();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Empleados</h1>
      <button className="btn btn-success mb-4" onClick={openAddModal}>
        Empleado Nuevo
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Supervisor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.lastname}</td>
              <td>{employee.supervisor ? 'Yes' : 'No'}</td>
              <td>
                <button className="btn btn-primary" onClick={() => openEditModal(employee)}>
                  Edit
                </button>
                <button className="btn btn-danger ms-2" onClick={() => openDeleteModal(employee)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Employee Modal */}
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal} className="modal-dialog">
        <h2 className="mb-4">Empleado Nuevo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input {...register('name')} type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Lastname
            </label>
            <input {...register('lastname')} type="text" className="form-control" id="lastname" />
          </div>
          {/* Agrega otros campos según tus necesidades */}
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
        <button className="btn btn-secondary ms-2" onClick={closeAddModal}>
          Close
        </button>
      </Modal>

      {/* Edit Employee Modal */}
      {selectedEmployee && (
        <Modal isOpen={!!selectedEmployee} onRequestClose={closeEditModal} className="modal-dialog">
          <h2 className="mb-4">Edit Employee</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                {...register('name', { defaultValue: selectedEmployee.name })}
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                {...register('lastname', { defaultValue: selectedEmployee.lastname })}
                type="text"
                className="form-control"
                id="lastname"
              />
            </div>
            {/* Agrega otros campos según tus necesidades */}
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
          <button className="btn btn-danger ms-2" onClick={onDelete} disabled={selectedEmployee.supervisor}>
            Delete
          </button>
          <button className="btn btn-secondary ms-2" onClick={closeEditModal}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

export default EmployeeList;