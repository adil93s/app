import { Switch, Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from "@mui/material";
import { Box, Button, FormLabel, Input, Typography } from "@mui/joy";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EuroIcon from "@mui/icons-material/Euro";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../models/entities";
import { addProductThunk, updateProductThunk } from "../redux/productsSlice";
import { AppDispatch } from "../redux/store";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductFormModal({ open, onClose, product }: ProductFormModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<Product>(new Product());

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(new Product());
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product?._id) {
      dispatch(updateProductThunk(formData));
    } else {
      dispatch(addProductThunk(formData));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontSize="xl" fontWeight={800}>
        {product?._id ? "Modifier le produit" : "Créer un produit"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: "grid", gap: 2 }}>
            <FormControl fullWidth>
              <FormLabel>Nom</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Prix</FormLabel>
              <Input name="price" value={formData.price} onChange={handleChange} type="number" startDecorator={<EuroIcon fontSize="small" />} />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Type</FormLabel>
              <Input name="type" value={formData.type} onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Note</FormLabel>
              <Input name="rating" value={formData.rating} onChange={handleChange} type="number" startDecorator={<StarBorderIcon fontSize="small" />} />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Années de garantie</FormLabel>
              <Input name="warranty_years" value={formData.warranty_years} onChange={handleChange} type="number" />
            </FormControl>
            <FormControl fullWidth>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontSize="sm" sx={{ ml: 1 }}>
                  Disponibilité
                </Typography>
                <Switch name="available" checked={formData.available || false} onChange={handleChange} color="primary" sx={{ ml: 1 }} />
              </Box>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="neutral">
            Annuler
          </Button>
          <Button type="submit" color="primary">
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
