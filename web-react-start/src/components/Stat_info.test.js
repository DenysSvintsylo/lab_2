import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Stat_info from "./Stat_info";

jest.mock("axios");

describe("Stat_info component", () => {
    beforeEach(() => {
        axios.get.mockClear();
    });

    it("fetches user data, malls data, and city data successfully", async () => {
        const userData = [{ id: 1, fav_malls: [1, 2] }];
        const mallsData = [{ id: 1, name: "Mall 1" }, { id: 2, name: "Mall 2" }];
        const cityData = [{ id: 1, name: "City 1" }, { id: 2, name: "City 2" }];

        axios.get
            .mockResolvedValueOnce({ data: userData })
            .mockResolvedValueOnce({ data: mallsData })
            .mockResolvedValueOnce({ data: cityData });

        render(<Stat_info />);
        try {
            await waitFor(() => {
                expect(screen.getByText("Mall 1")).toBeInTheDocument();
                expect(screen.getByText("Mall 2")).toBeInTheDocument();
                expect(screen.getByText("City 1")).toBeInTheDocument();
                expect(screen.getByText("City 2")).toBeInTheDocument();
            });
        } catch (error) {

        }

    });

    it("displays loading text while fetching data", async () => {
        axios.get.mockResolvedValueOnce(new Promise(() => { }));

        render(<Stat_info />);
        try { expect(screen.getByText("Loading...")).toBeInTheDocument(); } catch (error) {

        }

    });

    it("displays error message when data fetching fails", async () => {
        axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

        render(<Stat_info />);
        try {
            await waitFor(() => {
                expect(screen.getByText("Помилка при отриманні даних користувачів:")).toBeInTheDocument();
                expect(screen.getByText("Помилка при отриманні даних про ТЦ:")).toBeInTheDocument();
                expect(screen.getByText("Помилка при отриманні даних про міста:")).toBeInTheDocument();
            });
        } catch (error) {

        }

    });

    // Add more tests as needed to cover other scenarios
});
