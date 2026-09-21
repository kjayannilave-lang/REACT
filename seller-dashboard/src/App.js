import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductView from "./pages/ProductView";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Register />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <ProtectedRoute>
                            <ProductView />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
