package cz.itnetwork.entity.repository.specification;

import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoiceEntity_;
import cz.itnetwork.entity.filter.InvoiceFilter;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
public class InvoiceSpecification implements Specification<InvoiceEntity> {

   //specification for using filters
    private final InvoiceFilter filter;

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
        if (filter.getMinPrice()!=null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get(InvoiceEntity_.PRICE),filter.getMinPrice()));

        }
        if (filter.getMaxPrice()!=null){
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get(InvoiceEntity_.PRICE), filter.getMaxPrice()));
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
