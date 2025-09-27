import {getJsonStructure} from './index'

describe('convert', () => {
  it('schema to json', () => {
    const schema = {
      title: 'Product',
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            personalNumber: {type: 'string'},
            firstName: {type: 'string'},
            lastName: {type: 'string'},
            email: {type: 'string'},
            phoneNumber: {type: 'string'},
            address: {type: 'string'},
            city: {type: 'string'},
            zipCode: {type: 'string'},
            country: {type: 'string'},
            dateOfBirth: {type: 'string'},
            username: {type: 'string'},
          },
        },
        list: {type: 'array', items: {type: 'string'}},
        orders: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              createdAt: {type: 'string'},
              status: {type: 'string'},
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    productId: {type: 'string'},
                    name: {type: 'string'},
                    price: {type: 'number'},
                    quantity: {type: 'number'},
                  },
                  required: [],
                },
              },
              price: {type: 'string'},
              currency: {type: 'string'},
              shippingAddress: {type: 'string'},
              trackingNumber: {type: 'string'},
              paymentMethod: {type: 'string'},
            },
            required: [],
          },
        },
      },
    }

    const result = getJsonStructure(schema)
    expect(result).toEqual({
      user: {
        id: 'string',
        personalNumber: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phoneNumber: 'string',
        address: 'string',
        city: 'string',
        zipCode: 'string',
        country: 'string',
        dateOfBirth: 'string',
        username: 'string',
      },
      list: ['string'],
      orders: [
        {
          id: 'string',
          createdAt: 'string',
          status: 'string',
          items: [
            {
              productId: 'string',
              name: 'string',
              price: 'number',
              quantity: 'number',
            },
          ],
          price: 'string',
          currency: 'string',
          shippingAddress: 'string',
          trackingNumber: 'string',
          paymentMethod: 'string',
        },
      ],
    })
  })
})
