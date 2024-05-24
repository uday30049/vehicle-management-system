package com.uday.hello.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uday.hello.entity.product;

public interface productrepository extends JpaRepository<product,Integer>{
    product findByName(String name);

}
