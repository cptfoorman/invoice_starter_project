package cz.itnetwork.service;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService{


    @Autowired
    private InvoiceServiceImpl invoiceService;

    @Autowired
    private PersonServiceImpl personService;

    @Override
    public InvoiceStatisticsDTO getInvoiceAllTimeStatistics() {
        InvoiceFilter invoiceFilter = new InvoiceFilter();
        InvoiceStatisticsDTO invoiceStatisticsDTO = new InvoiceStatisticsDTO();
        //init a year string for comparison for currentYearSum
        String localDateSubstring = LocalDate.now().toString().substring(0,4);
        //read values from invoiceDTO
        for (InvoiceDTO i: invoiceService.getAllInvoices(invoiceFilter)){
            String currentInvoiceYear = i.getIssued().toString().substring(0,4);
            //add stats to the new DTO
            invoiceStatisticsDTO.setInvoiceCount(invoiceStatisticsDTO.getInvoiceCount()+1);
            //add allTimeSum
            invoiceStatisticsDTO.setAllTimeSum(invoiceStatisticsDTO.getAllTimeSum()+i.getPrice());
            //count currentYearSum dependent on the current date
            if (currentInvoiceYear.contains(localDateSubstring)){
                invoiceStatisticsDTO.setCurrentYearSum(invoiceStatisticsDTO.getCurrentYearSum()+i.getPrice());
            }
        }
        return invoiceStatisticsDTO;
    }



    @Override
    public List<PersonStatisticsDTO> getPersonsStatistics() {
        List<PersonStatisticsDTO> personStatisticsDTOS = new ArrayList<>();
        //get all non-hidden people
        //loop over list of the people
        for (PersonDTO i: personService.getAll()){
            PersonStatisticsDTO newStatisticsDTO = new PersonStatisticsDTO();
            newStatisticsDTO.setPersonId(i.getId());
            newStatisticsDTO.setPersonName(i.getName());
            //get all invoices according to the current persons identificationNumber
            List<InvoiceDTO> personsInvoices = invoiceService.getSellersByIdNum(i.getIdentificationNumber());
            for (InvoiceDTO invoice: personsInvoices){
                //add revenue from gotten invoices
                newStatisticsDTO.setRevenue(newStatisticsDTO.getRevenue()+invoice.getPrice());
            }
            //add new constructed DTO to the list
            personStatisticsDTOS.add(newStatisticsDTO);
        }
        return personStatisticsDTOS;
    }
}
