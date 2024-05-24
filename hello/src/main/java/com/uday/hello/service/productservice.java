package com.uday.hello.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.uday.hello.entity.product;
import com.uday.hello.repository.productrepository;

@Service
public class productservice {
    @Autowired
    private productrepository repository;
    public product saveproduct(product product){
        return repository.save(product);
    }
    public List<product> saveproducts(List<product> products){
        return repository.saveAll(products);
    }
    public List<product> getproducts(){
        return repository.findAll();
    }
    public product getproductbyid(int id){
        return repository.findById(id).orElse(null);
    }
    public product getproductbyname(String name){
        return repository.findByName(name);
    }
    public String deleteproduct(int id){
        repository.deleteById(id);
        return "product removed!!" +id;
    }
    public product updateproduct(product product){
        product existingproduct=repository.findById(product.getId()).orElse(null);
        existingproduct.setName(product.getName());
        existingproduct.setQuantity(product.getQuantity());
        existingproduct.setPrice(product.getPrice());
        return repository.save(existingproduct);
    }

    
    

}
