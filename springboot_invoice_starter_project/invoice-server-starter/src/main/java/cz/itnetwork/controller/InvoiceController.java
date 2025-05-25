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

    /*
     * calls service layer to fetch all invoices
     * @return List<InvoiceDTO>*/
    @GetMapping("/invoice/getAll")
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter){
        return invoiceService.getAllInvoices(invoiceFilter);
    }

    /*
     * calls service layer to fetch all invoices
     * @return InvoiceDTO*/
    @GetMapping("/invoice/{id}")
    public InvoiceDTO getInvoiceById(@PathVariable Long id){
        return invoiceService.getInvoice(id);
    }

    /*
     * calls service layer to add a new invoice
     * @return InvoiceDTO*/
    @PostMapping("/invoice")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.addInvoice(invoiceDTO);
    }

    /*
     * calls service layer to delete specific invoice
     * @return HttpStatus*/
    @DeleteMapping("/invoice/{id}")
    public HttpStatus deleteInvoice(@PathVariable Long id){
        return invoiceService.removeInvoice(id);
    }

    /*
     * calls service layer to fetch all invoices with corresponding identificationNumber
     * @return List<InvoiceDTO>*/
    @GetMapping("/identification/{id}/purchases")
    public List<InvoiceDTO> getByBuyersIdentification(@PathVariable String id){
        return invoiceService.getBuyersByIdNum(id);
    }

    /*
     * calls service layer to fetch all invoices with corresponding identificationNumber
     * @return List<InvoiceDTO>*/
    @GetMapping("/identification/{id}/sales")
    public List<InvoiceDTO> getByIdentification(@PathVariable String id){
        return invoiceService.getSellersByIdNum(id);
    }
    /*
     * calls service layer to edit an already creted invoice in the database
     * @return InvoiceDTO*/
    @PutMapping("/invoice/{id}")
    public InvoiceDTO editInvoice(@PathVariable Long id, @RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.editInvoice(id,invoiceDTO);
    }

}
