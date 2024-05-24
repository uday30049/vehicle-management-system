package com.uday.hello.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.uday.hello.entity.product;
import com.uday.hello.service.productservice;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin
public class productcontroller {
    @Autowired
    private productservice service;
    @PostMapping("/addproduct")
    
    public product addproduct(@RequestBody product product){
        return service.saveproduct(product);
    }
    @PostMapping("/addproducts")
    public List<product> addproducts(@RequestBody List<product> products){
        return service.saveproducts(products);
    }
    @GetMapping("/products")
    public List<product>findallproducts(){
        return service.getproducts();
    }
    @GetMapping("/productbyid/{id}")
   
    public product findproductbyid(@PathVariable int id){
        return service.getproductbyid(id);
    }

    @GetMapping("/productbyname/{name}")
    public product findproductbyname( @PathVariable String name){
        return service.getproductbyname(name);
    }
    @PutMapping("/update")
    
    public product updateproduct(@RequestBody product product){
        return service.updateproduct(product);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteproduct(@PathVariable int id){
        return service.deleteproduct(id);
    }

}
