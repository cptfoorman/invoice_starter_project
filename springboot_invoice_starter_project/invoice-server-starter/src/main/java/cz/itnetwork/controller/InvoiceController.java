package cz.itnetwork.controller;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.InvoiceService;
import cz.itnetwork.service.InvoiceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
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
    public HttpStatus deleteInvoice(@PathVariable Long id){
        return invoiceService.removeInvoice(id);
    }

    @GetMapping("/identification/{id}/purchases")
    public List<InvoiceDTO> getByBuyersIdentification(@PathVariable String id){
        return invoiceService.getBuyersByIdNum(id);
    }
    @GetMapping("/identification/{id}/sales")
    public List<InvoiceDTO> getByIdentification(@PathVariable String id){
        return invoiceService.getSellersByIdNum(id);
    }
    @PutMapping("/invoice/{id}")
    public InvoiceDTO editInvoice(@PathVariable Long id, @RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.editInvoice(id,invoiceDTO);
    }

}
