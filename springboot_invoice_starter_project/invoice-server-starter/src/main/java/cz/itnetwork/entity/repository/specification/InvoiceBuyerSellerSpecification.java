package cz.itnetwork.entity.repository.specification;

import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoiceEntity_;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.PersonEntity_;
import cz.itnetwork.entity.filter.InvoiceBuyerSellerFilter;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
public class InvoiceBuyerSellerSpecification implements Specification<InvoiceEntity>{

    private final InvoiceBuyerSellerFilter filter;
    @Override
    public Specification<InvoiceEntity> and(Specification<InvoiceEntity> other) {
        return Specification.super.and(other);
    }

    @Override
    public Specification<InvoiceEntity> or(Specification<InvoiceEntity> other) {
        return Specification.super.or(other);
    }

    @Override
    public Predicate toPredicate(Root<InvoiceEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        if (!filter.isBuyer()){
            if (filter.getIdentificationNumber()!=null){
                Join<PersonEntity, InvoiceEntity> personJoin = root.join(InvoiceEntity_.SELLER);
                predicates.add(personJoin.get(PersonEntity_.IDENTIFICATION_NUMBER).in(filter.getIdentificationNumber()));
            }
        }
        else {
            if (filter.getIdentificationNumber()!=null){
                Join<PersonEntity, InvoiceEntity> personJoin = root.join(InvoiceEntity_.BUYER);
                predicates.add(personJoin.get(PersonEntity_.IDENTIFICATION_NUMBER).in(filter.getIdentificationNumber()));
            }
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
