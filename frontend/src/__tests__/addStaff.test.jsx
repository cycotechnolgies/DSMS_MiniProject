import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AddStaff from "../pages/forms/addStaff";

jest.mock("axios");

describe("AddStaff Component", () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: {} });
    });

    test("renders AddStaff component", () => {
        render(
            <Router>
                <AddStaff />
            </Router>
        );
        expect(screen.getByText(/Add Staff/i)).toBeInTheDocument();
    });

    test("displays validation errors on submit with empty fields", async () => {
        render(
            <Router>
                <AddStaff />
            </Router>
        );

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Birthday is required/i)).toBeInTheDocument();
            expect(screen.getByText(/NIC number is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Contact number is required/i)).toBeInTheDocument();
            expect(screen.getByText(/WhatsApp number is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/User type is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Confirm password is required/i)).toBeInTheDocument();
        });
    });

    test("displays email validation error", async () => {
        render(
            <Router>
                <AddStaff />
            </Router>
        );

        fireEvent.input(screen.getByPlaceholderText(/Enter email address/i), {
            target: { value: "invalid-email" },
        });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
        });
    });

    test("displays password mismatch error", async () => {
        render(
            <Router>
                <AddStaff />
            </Router>
        );

        fireEvent.input(screen.getByPlaceholderText(/Enter password/i), {
            target: { value: "password123" },
        });

        fireEvent.input(screen.getByPlaceholderText(/Confirm password/i), {
            target: { value: "differentpassword" },
        });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });

    test("displays contact number validation error", async () => {
        render(
            <Router>
                <AddStaff />
            </Router>
        );

        fireEvent.input(screen.getByPlaceholderText(/Enter contact number/i), {
            target: { value: "invalid-contact" },
        });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(screen.getByText(/Invalid Sri Lankan contact number/i)).toBeInTheDocument();
        });
    });

    test("submits form successfully", async () => {
        axios.post.mockResolvedValue({ data: { message: "Staff added successfully" } });

        render(
            <Router>
                <AddStaff />
            </Router>
        );

        fireEvent.input(screen.getByPlaceholderText(/Enter first name/i), {
            target: { value: "John" },
        });

        fireEvent.input(screen.getByPlaceholderText(/Enter last name/i), {
            target: { value: "Doe" },
        });

        fireEvent.input(screen.getByPlaceholderText(/Enter email address/i), {
            target: { value: "john.doe@example.com" },
        });

        fireEvent.input(screen.getByPlaceholderText(/Enter password/i), {
            target: { value: "password123" },
        });

        fireEvent.input(screen.getByPlaceholderText(/Confirm password/i), {
            target: { value: "password123" },
        });

        fireEvent.input(screen.getByPlaceholderText(/Enter contact number/i), {
            target: { value: "0712345678" },
        });
        fireEvent.input(screen.getByPlaceholderText(/Enter WhatsApp number/i), {
            target: { value: "0712345678" },
        });

        fireEvent.input(screen.getByPlaceholderText(/Permanent address/i), {
            target: { value: "123 Main St" },
        });

        fireEvent.change(screen.getByLabelText(/User Type/i), {
            target: { value: "staff" },
        });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(screen.getByText(/Staff added successfully/i)).toBeInTheDocument();
        });
    });
});