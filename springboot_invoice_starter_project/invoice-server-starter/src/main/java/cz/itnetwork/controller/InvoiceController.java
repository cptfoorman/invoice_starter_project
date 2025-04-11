package cz.itnetwork.controller;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.InvoiceService;
import cz.itnetwork.service.InvoiceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private InvoiceServiceImpl invoiceService;

    @GetMapping("/invoice/getAll")
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter){
        return invoiceService.getAllInvoices(invoiceFilter);
    }
    @GetMapping("/invoice/{id}")
    public InvoiceDTO getInvoiceById(@PathVariable Long id){
        return invoiceService.getInvoice(id);
    }
    @PostMapping("/invoice")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.addInvoice(invoiceDTO);
    }

    @DeleteMapping("/invoice/{id}")
    public void deleteInvoice(@PathVariable Long id){
        invoiceService.removeInvoice(id);
    }
}
