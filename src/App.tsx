import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ManufacturerDashboard from "./pages/manufacturer/ManufacturerDashboard";
import WasteUploadPage from "./pages/manufacturer/WasteUploadPage";
import RecyclerListPage from "./pages/manufacturer/RecyclerListPage";
import RecyclerDetailPage from "./pages/manufacturer/RecyclerDetailPage";
import CompareRecyclersPage from "./pages/manufacturer/CompareRecyclersPage";
import CompanyProfilePage from "./pages/manufacturer/CompanyProfilePage";
import ManageUsersPage from "./pages/manufacturer/ManageUsersPage";
import RequestsPage from "./pages/manufacturer/RequestsPage";
import ManufacturerRequestDetailsPage from "./pages/manufacturer/RequestDetailsPage";
import RecyclingRecordsPage from "./pages/manufacturer/RecyclingRecordsPage";
import RecyclerDashboard from "./pages/recycler/RecyclerDashboard";
import PricingConfigPage from "./pages/recycler/PricingConfigPage";
import EditProfilePage from "./pages/recycler/EditProfilePage";
import RecyclerRequestDetailsPage from "./pages/recycler/RequestDetailsPage";
import RecyclerRecordsPage from "./pages/recycler/RecordsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Manufacturer Routes */}
            <Route path="/manufacturer/dashboard" element={<ManufacturerDashboard />} />
            <Route path="/manufacturer/upload" element={<WasteUploadPage />} />
            <Route path="/manufacturer/recyclers" element={<RecyclerListPage />} />
            <Route path="/manufacturer/recycler/:id" element={<RecyclerDetailPage />} />
            <Route path="/manufacturer/compare" element={<CompareRecyclersPage />} />
            <Route path="/manufacturer/profile" element={<CompanyProfilePage />} />
            <Route path="/manufacturer/users" element={<ManageUsersPage />} />
            <Route path="/manufacturer/requests" element={<RequestsPage />} />
            <Route path="/manufacturer/requests/:id" element={<ManufacturerRequestDetailsPage />} />
            <Route path="/manufacturer/records" element={<RecyclingRecordsPage />} />
            
            {/* Recycler Routes */}
            <Route path="/recycler/dashboard" element={<RecyclerDashboard />} />
            <Route path="/recycler/pricing" element={<PricingConfigPage />} />
            <Route path="/recycler/profile" element={<EditProfilePage />} />
            <Route path="/recycler/requests/:id" element={<RecyclerRequestDetailsPage />} />
            <Route path="/recycler/records" element={<RecyclerRecordsPage />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;